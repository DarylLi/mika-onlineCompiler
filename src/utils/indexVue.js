import { useState, memo } from "react";
import { transform, registerPlugin } from "@babel/standalone";
import { matchFileName, loadAsyncCdn } from "./commonUtils";

const targetDom = document.createElement("div");
targetDom.setAttribute("id", "vue-target");
document.body.append(targetDom);

// vue编译后资源存储
var compiledFileObj = {};
// 编译vue文件
const doTransformVue = async (name, str) => {
  const options = {
    moduleCache: {
      vue: Vue,
    },
    getFile(url) {
      //   if (url === "/myComponent.vue") return Promise.resolve(transVueStr);
      if (url === name) return Promise.resolve(str);
    },
    addStyle(textContent) {
      const style = Object.assign(document.createElement("style"), {
        textContent,
      });
      const ref = document.head.getElementsByTagName("style")[0] || null;
      document.head.insertBefore(style, ref);
    },
  };
  const { loadModule } = window["vue3-sfc-loader"];
  await loadModule(name, options).then((comp) => {
    compiledFileObj[name] = comp;
    window.__compiledFileObj__ = compiledFileObj;
  });
  return compiledFileObj;
};
// import替换为编译后vue代码
const VueImportReplacement = async (name, str, checkedFile) => {
  // 寻找无子组件依赖的纯vue组件
  let resultArr = [...str.matchAll(/import.*from.*\.vue.*(;|\s)/g)];
  let result = str;
  if (resultArr.length > 0) {
    //   resultArr.forEach((mr, index) => {
    for (var index = 0; index < resultArr.length; index++) {
      let mr = resultArr[index];
      let matchedName = matchFileName(checkedFile, mr[0]);
      // 若引用文件存在则替换文件内容
      if (matchedName) {
        let fileInfo = matchedName;
        //   doTransformVue(fileInfo.name, fileInfo.value);
        await VueImportReplacement(
          fileInfo.filename,
          fileInfo.value,
          checkedFile
        );
        let importTarget = mr[0].replace("import", "").split("from")[0].trim();
        // 依赖组件编译完后替换处理
        const replaceCode = `let ${importTarget} = window.__compiledFileObj__['${fileInfo.filename}'];`;
        result = result.replace(mr[0], `${replaceCode};`);
      }
      // 不存在则先注释处理
      else {
        result = result.replace(mr[0], `//${mr[0]}`);
      }
      await doTransformVue(name, result);
    }
  }
  //   );
  else {
    await doTransformVue(name, str);
  }
};
let currentApp = null;
export const loadVueTemplate = (entryFile, templates, isupdate) => {
  !isupdate &&
    Promise.all([
      loadAsyncCdn("https://unpkg.com/vue@3.5.11/dist/vue.global.js"),
      loadAsyncCdn(
        "https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"
      ),
    ]).then((res) => {
      VueImportReplacement("app.vue", entryFile, templates).then((res) => {
        if (compiledFileObj["app.vue"]) {
          currentApp = Vue.createApp(compiledFileObj["app.vue"]);
          currentApp.mount("#previewVueFrame");
        }
      });
    });
  isupdate &&
    VueImportReplacement("app.vue", entryFile, templates).then((res) => {
      if (compiledFileObj["app.vue"]) {
        currentApp && currentApp.unmount();
        currentApp = Vue.createApp(compiledFileObj["app.vue"]);
        currentApp.mount("#previewVueFrame");
      }
    });
};
