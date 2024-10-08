import React from "react";
import Directory from '@components/vueEditor/lftdir';
import MainEditor from '@components/vueEditor/ctmain';
import RightView from '@components/vueEditor/rtview'

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