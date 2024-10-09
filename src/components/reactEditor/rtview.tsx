import React, { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { doThrottleChange } from "@utils/index";

function RightView() {
  // let cursocket: any = null;
  const [autoWidth, setAutoWidth] = useState({});
  const [autoRight, setAutoRight] = useState({});
  const [curRight, setCurRight] = useState(210);
  const [curWidth, setCurWidth] = useState(200);
  const [curCalWidth, setCurCalWidth] = useState(null) as any;

  const dragRef: any = useRef(null);
  const holdDrag = (e: any) => {
    const calWidth = dragRef.current.offsetLeft - e.screenX;
    if (calWidth === curCalWidth) return;
    const width = curWidth + calWidth;
    setCurCalWidth(calWidth);
    setAutoWidth({ width: `${width}px` });
  };
  const doRightChange = (e: any) => {
    let currentRight = curRight + curCalWidth;
    setAutoRight({ right: `${currentRight}px` });
    setCurWidth(curWidth + curCalWidth);
    setCurRight(currentRight);
  };
  return (
    <>
      <div
        className="mika-drag-bar"
        onDrag={doThrottleChange(200, holdDrag)}
        onDragEnd={doRightChange}
        draggable="true"
        ref={dragRef}
        style={autoRight}
      ></div>
      <div
        className="mika-mona-right-view"
        id="previewFrame"
        style={autoWidth}
      ></div>
    </>
  );
}

export default observer(RightView);
