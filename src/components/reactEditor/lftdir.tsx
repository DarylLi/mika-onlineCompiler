import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Tree } from "antd";
import { templates } from "@mock/fileData";
import { editStore } from "@store/index";
import { getCodeTransform, getFileContent } from "@utils/index";
import {
  initIndexDB,
  getAllData,
  addData,
  updateData,
  getData,
  deleteData,
} from "@utils/indexDb";
import { observer } from "mobx-react-lite";

// const projcetTmp = { ...templates, ...crd, ...umiRust };

function Directory() {
  // editStore.setCurrentFile(currentFile);

  // const [spendKeys, setSpendKeys] = useState([editStore?.curType || "vue"]);
  const [spendKeys, setSpendKeys] = useState([templates[0]?.path]);
  const [selectedKeys, setSelectedKeys] = useState([] as any);

  const onExpand: any = (expandedKeys: any, expanded: boolean) => {
    setSpendKeys(expandedKeys);
  };
  const onSelect = (selectedKeys: any[], info: any) => {
    // replaceFileContent(
    //   editStore.currentFiles,
    //   info?.node?.path,
    //   info?.node?.value
    // );
    info?.node?.kind !== "directory" &&
      editStore.updateCode(
        getFileContent(editStore.currentFiles, info?.node?.path) || ""
      );
    info?.node?.kind !== "directory" && editStore.updateInfo(info?.node || "");
    // getDBSaved({});
    setSpendKeys(
      spendKeys.includes(info?.node?.filename)
        ? spendKeys.filter((e) => e !== info.node.filename)
        : [...spendKeys, info?.node?.filename]
    );
    setSelectedKeys(selectedKeys);
  };
  useEffect(() => {
    const curData = {
      db: null,
      storeName: "mika-templates", //当前的数据库名
      version: 1, //版本号
    };
    const info = {
      id: "daryl",
      name: "daryl",
      templates,
    };
    // 设定一个入口文件：app.jsx

    setTimeout(async () => {
      const curRequest = await initIndexDB(curData);
      editStore.setCurrentFiles(templates);
      editStore.setCurrentIndexDBInstance(curRequest);
      try {
        // indedb初始化
        let indexStore = await getData(
          curRequest.db,
          "mika-templates",
          "daryl"
        );
        // 渲染文件树，及indexdb缓存生成
        indexStore?.templates
          ? editStore.setCurrentFiles(indexStore.templates)
          : addData(curRequest.db, "mika-templates", info);
        // 默认文件加载
        const currentFile = (indexStore?.templates ||
          templates)[0].children.find((e: any) =>
          e.filename.includes("app.jsx")
        );
        // 默认文件store相关存储
        editStore.updateCode(currentFile.value);
        editStore.updateInfo(currentFile);
        setSelectedKeys([currentFile.path]);
        // 渲染入口文件内容至目标dom
        const getRootDom = setInterval(() => {
          document.getElementById("previewFrame") &&
            (() => {
              getCodeTransform(
                currentFile?.value || "",
                indexStore?.templates || templates
              );
              clearInterval(getRootDom);
            })();
        }, 500);
      } catch (error) {
        console.log(error);
        // addData(curRequest.db, "mika-templates", info);
      }

      // updateData(curRequest.db, "mika-templates", info);
    });
  }, []);
  return (
    <div className="mika-mona-left-dir">
      {editStore.currentFiles.length > 0 && (
        <Tree
          showLine={true}
          showIcon={true}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          onExpand={onExpand}
          expandedKeys={spendKeys}
          treeData={editStore.currentFiles}
          fieldNames={{ title: "filename", key: "path" }}
        />
      )}
    </div>
  );
}

export default observer(Directory);
