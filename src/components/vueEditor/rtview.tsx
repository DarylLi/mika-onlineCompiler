import React, { useState } from "react";
import { observer } from "mobx-react-lite";

function RightView() {
  // let cursocket: any = null;
  const [showView, setShowView] = useState(false);

  return <div className="mika-mona-right-view" id="previewVueFrame"></div>;
}

export default observer(RightView);
