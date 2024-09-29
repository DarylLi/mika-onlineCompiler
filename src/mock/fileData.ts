export const templates : any = [{filename:'src',
value:'',
path:'src',kind:'directory',children:[
  // {
  //   filename:'utils.js',
  //   path:'src/utils.js',
  //   value:`
  //       export const getA = () => {};
  //       const getB = () => {};
  //       const getC = () => {};
  //       export default { getA, getB, getC };
  //   `,
  // },
  {
    filename:'app.jsx',
    value:`    import A from './extraA.jsx';
    import B from './extraB.jsx';
  
    function App() {
        const [txt,setTxt] = useState(0)
        const getCall = ()=>{alert('change text!');setTxt(txt+1)}
        let style ='important!';
        return (
          <>
              <A />
              <div onClick={() => getCall()}>try click it{txt}</div>
              <p>other component:</p>
              <B />
          </>
        );
      }
    export default App;`,
    path:'src/app.jsx'
  },{
    filename:'extraA.jsx',
    value:`   function ExtraA() {
      const [txt,setTxt] = useState(0)
      const getCall = ()=>{alert('change text!');setTxt(txt+1)}
      return (
        <div className="App-inner">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link" 
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>this component is loaded by ExtraA</p>
      </div>
      );
    }
  export default ExtraA`,
    path:'src/extraA.jsx'
  },{
    filename:'extraB.jsx',
    value:`   function ExtraB() {
        const [txt,setTxt] = useState(0)
        const getCall = ()=>{alert('wasai');setTxt(txt+1)}
        return (
          <div>this is loaded by ExtraB </div>
        );
      }
    export default ExtraB`,
    path:'extraB.jsx'
  },{
    filename:'extraC.jsx',
    value:`   function ExtraC() {
        console.log('init');
        const [txt,setTxt] = useState(0)
        return (
          <div>this is loaded by ExtraC </div>
        );
      }
    export default ExtraC`,
    path:'extraC.jsx'
  },{
    filename:'main.css',
    value:`.App-header{background:#dedede;font-size:28px}`,
    path:'main.css'
  },{
    filename:'component.css',
    value:`.App-inner{background:#fbe2f0;font-size:12px}`,
    path:'component.css'
  }
]}]
  