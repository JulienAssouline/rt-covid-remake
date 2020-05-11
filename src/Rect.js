import React from "react";

function Rect({ x, y, width, height, styles }) {
  return <rect x={x} y={y} width={width} height={height} style={styles} />;
}

export default Rect;
