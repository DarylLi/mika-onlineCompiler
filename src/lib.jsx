import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import EditorRoot from './editorRoot';
import PageEntry from './pageEntry';
// import Sandbox from './components/sandbox'


function renderComponents(target,type,props){
    const root = ReactDOM.createRoot(target||document.getElementById('root'));
    //react18中 ReactDOM render root只能存在一个。若重复创建渲染root则会抛出错误。目前先在组件内ReactDom实例创建使用render
    window.React = React;
    window.ReactDOM = ReactDOM;
    root.render(
        type === 1 ? <PageEntry {...props}/> : <EditorRoot {...props}/>
    );
}
export default {
    renderComponents
}