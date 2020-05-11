import React from "react";

function Path({ pathFun, styles }) {
  return <path d={pathFun} style={styles} />;
}

export default Path;
