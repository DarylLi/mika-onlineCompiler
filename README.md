# mika-online-compiler

#这是一个基于前端渲染的在线编辑器，目前仅支持轻量级少量 react 文件内容编辑，后续功能逐步完善中

an editor compile &amp; preview on browser online

how to start:
yarn dev or npm run dev

use mika-editor as component:

1.  for webpack

warn: if your config set of output path is not "/build",you should follow cdn config, else just use esm way to import

======= using by cdn =======
step 1: import lib:

1.1: add static lib in your html file

<script src="https://raw.githubusercontent.com/DarylLi/mika-online-compiler/refs/heads/develop/build/root.bundle.js" > </script>

1.2: for webpack config:

<!-- setting your externals options as below:

        externals: [
        {
            "mika-editor-fe": "root_MikaEdit",
        },

        ],
    -->

step 2: render component by using init function:

<!--
        import mikaEditorInstance from 'mika-editor-fe';

        mikaEditorInstance.renderComponents(document.getElementById("editor")//setting your target dom);
    -->

2.  you could also load dynamic fetch method to import & use this lib:

  <!-- 
    let script = document.createElement("script");
    
    //you could copy a new file from git resouce, and load it as your local resouce
    script.setAttribute("src", "https://raw.githubusercontent.com/DarylLi/mika-online-compiler/refs/heads/develop/build/root.bundle.js");

    document.body.appendChild(script);
    script.onload = () => {
      window.root_MikaEdit.default.renderComponents(
        document.getElementById("editor")//setting your target dom
      );
    };
    
 -->
