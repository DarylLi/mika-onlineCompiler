import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { editStore } from "@store/index";
import { observer } from "mobx-react-lite";
import {
  getCodeTransform,
  getFileContent,
  doDebounceChange,
  doThrottleChange,
} from "@utils/index";
import { updateData } from "@utils/indexDb";
import { toJS } from "mobx";
function MainEditor() {
  // let cursocket: any = null;
  const [code, setCode] = useState("");
  // const [cursocket, setCurSocket] = useState(null as any);
  const editorDidMount = (editor: any, monaco: any) => {
    editor.focus();
  };

  const onChange = async (newValue: any, e: any) => {
    // editStore.currentFiles,
    //   info?.node?.path,
    //   info?.node?.value
    editStore.replaceFileContent(newValue);
    editStore.updateCode(newValue || "");
    // 更新入口文件
    let currentFile = getFileContent(editStore.currentFiles, "src/app.jsx");
    // 重新编译入口文件
    getCodeTransform(currentFile || "", editStore.currentFiles, true);
    const changedData = {
      id: "daryl",
      name: "daryl",
      templates: toJS(editStore.currentFiles),
    };
    updateData(
      (editStore?.currentIndexDBInstance as any)?.db,
      "mika-templates",
      changedData
    );
  };
  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <div className="mika-mona-center-editor">
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={editStore.code}
        options={options}
        onChange={doDebounceChange(500, onChange)}
        editorDidMount={editorDidMount}
      ></MonacoEditor>
    </div>
  );
}

export default observer(MainEditor);
