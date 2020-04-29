import React, { useState } from "react";
import TooltipBox from "./TooltipBox";
import { clientPoint } from "d3-selection";
import { bisector } from "d3-array";
import { monthNames } from "./utils/helpers";

function Tooltip({ height, width, xScale, data, parseTime }) {
  const [display, setDisplay] = useState(false);
  const [lineOpacity, setLineOpacity] = useState(0);
  const [lineX, setLineX] = useState(0);
  const [tooltipInfo, setTooltipInfo] = useState({ date: "", Rt: null });

  const bisect = bisector((d) => parseTime(d.d)).left;

  function handleMouseMove(e) {
    setDisplay(true);
    setLineX(window.event.offsetX - 40);
    setLineOpacity(1);

    const valueX = clientPoint(e.currentTarget.parentNode, e)[0];

    const date = xScale.invert(valueX);

    const index = bisect(data, date, 1);

    const Rt = data[index] ? data[index].c["r0"] : null;

    setTooltipInfo({
      date: `${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`,
      Rt: Rt,
    });
  }

  function handleMouseOut() {
    setLineOpacity(0);
    setDisplay(false);
  }

  return (
    <>
      <line
        x1={lineX}
        y1={0}
        x2={lineX + 3}
        y2={height}
        style={{
          fill: "none",
          stroke: "rgb(235, 83, 88)",
          opacity: lineOpacity,
        }}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{ opacity: 0, stroke: "rgba(0, 0, 0, .09)" }}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />

      <TooltipBox x={lineX} y={100} info={tooltipInfo} display={display} />
    </>
  );
}

export default Tooltip;
