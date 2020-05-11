import React from "react";

function LineChart({ w, h, margin, children }) {
  return (
    <svg id="tooltip" width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
    </svg>
  );
}

export default LineChart;
