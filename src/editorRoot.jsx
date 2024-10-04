import React from "react";
import Directory from '@components/lftdir';
import MainEditor from '@components/ctmain';
import RightView from '@components/rtview'
import { observer } from "mobx-react";
import { editStore } from "@store/index";
import { Spin } from 'antd';
import './main.scss'

class EditorRoot extends React.Component{
    render(){
        return( 
           <>
            <div className="App">
                <Directory></Directory>
                <MainEditor></MainEditor>
                <RightView></RightView>
            </div>
            </>
        );
    }
};
export default EditorRoot