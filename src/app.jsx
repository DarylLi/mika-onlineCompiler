import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import Routers from './route';
// import PageEntry from './pageEntry';
// import Sandbox from './components/sandbox'
import BabelCmp from './babelCmp';
import './utils/indexVue'
import { BrowserRouter } from 'react-router-dom';
import './main.scss'
import { registryIntervalTimeout } from './utils';

//防止编辑器内写入interval或timeout因重复保存刷新造成内存泄漏
registryIntervalTimeout();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <BabelCmp/>
    <BrowserRouter>
        <Routers />
    </BrowserRouter>
);

export default root;


// function renderComponents(target,type,props){
//     const root = ReactDOM.createRoot(target||document.getElementById('root'));
//     console.log(root);
//     root.render(
//         type===1
//             ? <PageEntry {...props}/>
//             :<EditorRoot {...props}/>
//     );
// }
// export default {
//     renderComponents
// }