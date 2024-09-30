import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import PageEntry from './pageEntry';
// import Sandbox from './components/sandbox'
import BabelCmp from './babelCmp';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <BabelCmp/>
    <PageEntry/>
);

export default root;