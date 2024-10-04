import React, {useState, useEffect} from 'react'
import Directory from '@components/lftdir';
import MainEditor from '@components/ctmain';
import RightView from '@components/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import './main.scss'

console.log(RightView)
function PageEntry() {
  const [stat, setStat] = useState(1);
  const [code, setCode] = useState('');
  const [percent, setPercent] = React.useState(0);

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
  }
  const options = {
    selectOnLineNumbers: true
  };

  return (
    <>
    <div className="App">
        <Directory></Directory>
        <MainEditor></MainEditor>
        <RightView></RightView>
    </div>
    <Spin spinning={editStore.showSpin} percent={'auto'} fullscreen >code服务运行中。。。</Spin>
    </>
    
  );
}

export default observer(PageEntry);
