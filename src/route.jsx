import { Routes, Route, Outlet, Link } from "react-router-dom";
import EditorRoot from './editorRoot';
import EditorRootVue from "./editorRootVue";
import { useEffect, useState } from "react";
import { createRef } from "react";

export default function App() {
  return (
    <>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EditorRoot />} />
          <Route path="vue" element={<EditorRootVue />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
    const hRef= createRef();
    const [curclass,setCurclass] = useState(true)
    const [curroute,setCurRoute] = useState('react')
    const toggleClass=()=>{
      setCurclass(!curclass)
    }
    const hideLayout=()=>{
        setCurclass(true)
    }
    const toggleActive=(e, active)=>{
        hideLayout();
        setCurRoute(active)
    }
    useEffect(()=>{
        // document.getElementsByClassName("App")[0].addEventListener("click",()=>{
        //     hideLayout();
        // })
        let curDom = hRef.current;
        const charList = curDom.innerHTML.split("");
        let newWordDiv = document.createElement("span");
        newWordDiv.setAttribute("class",'word');
        newWordDiv.setAttribute("data-word",curDom.innerHTML)
        newWordDiv.setAttribute("style",'--word-index: 0;')

        curDom.innerHTML = '';
        charList.forEach((char,index)=>{
            let newDiv = document.createElement("span");
            newDiv.setAttribute("class","char");
            newDiv.setAttribute("data-char",char);
            newDiv.setAttribute("style",`--char-index: ${index};`);
            newDiv.innerHTML = char;
            newWordDiv.append(newDiv);
        })
        curDom.append(newWordDiv);
        curDom.setAttribute("style",`--word-total: ${3}; --char-total: ${charList.length};`)
    },[])
  return (
    <>
    <div className="switchIcon" ref={hRef} onClick={toggleClass} >show other editors</div>
    {/* <div className="switchIcon" ref={hRef}>you want to switch other editor ?</div> */}
    <div className={`mika-layout ${curclass? '' : 'show-layout'}`} >
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul className="mika-nav">
          <li className={`${curroute === 'react' ? 'active' : ''}`} >
            <Link to="/" onClick={(e)=>toggleActive(e,'react')}>React Render</Link>
          </li>
          <li className={`${curroute === 'vue' ? 'active' : ''}`} >
            <Link to="/vue" onClick={(e)=>toggleActive(e,'vue')}>Vue</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </div>
    <Outlet />
    </>

  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}