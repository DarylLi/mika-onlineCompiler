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


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root);
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