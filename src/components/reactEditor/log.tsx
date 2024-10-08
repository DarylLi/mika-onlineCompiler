import { observer } from "mobx-react";
import React, { PureComponent, createRef } from "react";
import { editStore } from "@store/index";
import { getCodeTransform } from "@utils/index";
import { Button, Modal } from "antd";
import axios from "axios";
import CryproJs from "crypto-js";

@observer
class EditLog extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLog: true,
      logPanelRef: null,
    };
  }
  switchLog = () => {
    this.setState({ showLog: !this.state.showLog });
  };
  componentDidMount(): void {
    this.setState({ logPanelRef: createRef() }, () => {
      editStore.setLogPanelRef(this.state.logPanelRef);
    });
  }
  render() {
    // console.log(CryproJs.MD5("dadadadad").toString(CryproJs.enc.Hex));
    const hideModal = () => {
      this.setState({ showLog: false });
    };
    const getCurrentRef = (ref: any) => {
      console.log(ref);
      // (e)=>editStore.logPanelRef
    };
    const getSave = () => {
      // axios.get("http://localhost:1919/startproject").then((res) => {
      //   console.log(res);
      // });
      let code = `
  import B from './b.jsx';
  import C from './c.jsx';
  import E from './ef.jsx';
  import loadsh from 'loadash';

  function Dcp() {
      const [txt,setTxt] = useState(0)
      const getCall = ()=>{alert('wasai');setTxt(txt+1)}
      let style ='important!';
      return (
        <>
            <B />
            <div onClick={() => getCall()}>kukuji990{txt}</div>
            <C />
            <E />
        </>
      );
    }
  export default Dcp;`;
      getCodeTransform(code);
      // if (!editStore.fileInfo) return;
      // editStore.clearLog();
      // this.setState({ showLog: true });
      // // 向服务器发送消息
      // editStore.updateSpin(true);
      // (editStore.socket as any) &&
      //   (editStore.socket as any).emit("updateCode", {
      //     data: editStore.fileInfo,
      //     newcode: editStore.code,
      //   });
      // editStore.previewView();
    };
    const { showLog, logPanelRef } = this.state;
    const classNames = {
      header: "mika-log-header",
      body: "mika-log-body",
    };
    return (
      <span>
        <Button onClick={getSave}>save</Button>
        <Button onClick={this.switchLog}>
          {showLog ? "hide console" : "show console"}
        </Button>
        <Modal
          title="compileLog"
          open={showLog}
          onOk={hideModal}
          onCancel={hideModal}
          okText="确认"
          classNames={classNames}
          cancelText="取消"
        >
          <div className="mika-out-log-content" ref={this.state.logPanelRef}>
            {editStore.logMsg.map((e, i) => (
              <p key={e.msg + i} className={e.status}>
                {e.msg}
              </p>
            ))}
          </div>
        </Modal>
      </span>
    );
  }
}

export default EditLog;
