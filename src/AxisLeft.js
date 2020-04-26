import React from "react";

function AxisLeft({ yScale, width, count }) {
  const textPadding = -20;

  const axis = yScale.ticks(count).map((d, i) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#e4e5eb", opacity: 0.5 }}
        y1={yScale(d)}
        y2={yScale(d)}
        x1={0}
        x2={width}
      />
      <text
        style={{ fontSize: 12, fill: "#c5c5c5" }}
        x={textPadding}
        dy=".32em"
        y={yScale(d)}
      >
        {d}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisLeft;
