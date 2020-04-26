import React from "react";
import { line, area } from "d3-shape";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeParse } from "d3-time-format";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import LinearGradient from "./LinearGradient";
import Tooltip from "./Tooltip";

function SmallMultipleContainer({ data }) {
  const w = 500,
    h = 260;

  const margin = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const parseTime = timeParse("%Y-%m-%d");

  function sortByState(a, b) {
    if (a.i < b.i) {
      return -1;
    }
    if (a.i > b.i) {
      return 1;
    }
    return 0;
  }

  data.sort(sortByState);

  const xScale = scaleTime()
    .domain([
      new Date("March 02 2020"),
      extent(data[0]["r0"], (el) => parseTime(el.d))[1],
    ])
    .range([0, width - 5]);

  const yScale = scaleLinear().domain([0, 4.5]).range([height, 0]);

  const path = line()
    .x((el) => {
      return xScale(parseTime(el.d));
    })
    .y((el) => yScale(el.c["r0"]));

  const pathArea = area()
    .x((el) => xScale(parseTime(el.d)))
    .y0((d) => yScale(d.c["l90"]))
    .y1((d) => yScale(d.c["h90"]));

  const lineCharts = data.map((d, i) => (
    <svg id="tooltip" key={i} width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <text x={-20} y={-20}>
          {d.i}
        </text>
        <text x={width - 30} y={-20}>
          {d["r0"][d["r0"].length - 1].c["r0"].toFixed(2)}
        </text>
        <AxisLeft yScale={yScale} width={width} count={5} />
        <AxisBottom xScale={xScale} height={height} />
        <LinearGradient state={d.i} height={height} yScale={yScale} />
        <path
          d={pathArea(d["r0"])}
          style={{
            fill: `url(#states-${d.i})`,
            stroke: `url(#states-${d.i})`,
            strokeWidth: 3,
            opacity: 0.08,
          }}
        />
        <path
          d={path(d["r0"])}
          style={{
            fill: "none",
            stroke: `url(#states-${d.i})`,
            strokeWidth: 1.5,
          }}
        />
        <Tooltip
          width={width}
          height={height}
          yScale={yScale}
          xScale={xScale}
          data={d["r0"]}
          parseTime={parseTime}
        />
      </g>
    </svg>
  ));

  return <div>{lineCharts}</div>;
}

export default SmallMultipleContainer;
