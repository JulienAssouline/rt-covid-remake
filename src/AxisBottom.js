import React from "react";
import { monthNames } from "./utils/helpers";

function AxisBottom({ xScale, height }) {
  const textPadding = 10;

  const axis = xScale.ticks(5).map((d, i) => (
    <g className="x-tick" key={i}>
      <text
        style={{ textAnchor: "middle", fontSize: 12, fill: "#c5c5c5" }}
        dy=".71em"
        x={xScale(d)}
        y={height + textPadding}
      >
        {`${monthNames[d.getMonth()]} ${d.getDate()}`}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisBottom;
