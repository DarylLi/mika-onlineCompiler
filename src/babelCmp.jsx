import { useEffect } from "react";
import { render } from 'react-dom';


function App() {
  useEffect(() => {
    let script = document.createElement("script");
    script.setAttribute("src", "http://localhost:8080/build/app.bundle.js");
    
    document.body.appendChild(script);
    setTimeout(() => {
      console.log(React.createElement("div", {}, "dadad"));
      window.app_MikaEdit.default.renderComponents(document.getElementById('target'))
      // const MikaM = window.app_MikaEdit.default;
      // const Elemet = React.createElement(MikaM, {});
      // render(Elemet, document.getElementById("target"));
      // ReactDOM.createRoot(document.getElementById("editorRoot")).render(
      //   window.root_MikaEdit.default.MikaEditor
      // );
    }, 500);
  }, []);
  return (
    <div>
      <button>编译</button>
      <div id='target'></div>
    </div>
  )
}

export default App