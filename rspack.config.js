const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const rspack = require("@rspack/core");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const config = {
  mode: "development",
  // entry: [path.join(__dirname,'/src/main.js'),path.join(__dirname,'/src/extra.js'),path.join(__dirname,'/src/haha.js')],
  entry: {
    app: path.join(__dirname, "/src/app.jsx"),
    root: path.join(__dirname, "/src/lib.jsx"),
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js",
    libraryTarget: "umd",
    library: "[name]_MikaEdit",
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jsx?)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets:
                    "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead",
                },
              ],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: /\.(tsx?)|(ts?)$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]",
        },
      },
      {
        test: path.resolve(__dirname, "node_modules/webpack-dev-server/client"),
        loader: "null-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: true,
    }),
    new CleanWebpackPlugin(),
    new rspack.HotModuleReplacementPlugin(),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["javascript"],
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".wasm"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@mock": path.resolve(__dirname, "src/mock/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@server": path.resolve(__dirname, "src/server/"),
      "@pkg": path.resolve(__dirname, "pkg/"),
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

// const devserver = new WebpackDevServer({
//   headers: { 'Access-Control-Allow-Origin': '*' },
//   hot: true, // 热更新
//   host: '127.0.0.1', // 地址
//   port: '8081', // 端口
//   open: true, // 是否自动打开
//   setupExitSignals: true,
//   compress: true
// }, webpack(config))
// devserver.start()

module.exports = config;
