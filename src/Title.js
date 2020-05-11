import React from "react";

function Title({ x, y, textLabel, styles }) {
  return (
    <text style={styles} x={x} y={y}>
      {textLabel}
    </text>
  );
}

export default Title;
