import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import AxisLeft from "./AxisLeft";
import { motion } from "framer-motion";

import {
  Northeast,
  tenLargestStates,
  West,
  Midwest,
  South,
} from "./utils/helpers";

function RangeDistPlot({ data, week, dropValue }) {
  const w = window.innerWidth - 100,
    h = 480;

  const margin = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const ovalWidth = 24;
  const ovalHeight = 18;

  function getValue(d, value) {
    const result =
      week === "Yesterday"
        ? d["r0"][d["r0"].length - 1].c[value]
        : week === "Last Week"
        ? d["r0"][d["r0"].length - 2].c[value]
        : week === "2 Weeks Ago"
        ? d["r0"][d["r0"].length - 3].c[value]
        : null;
    return result;
  }

  data.sort((a, b) => getValue(a, "r0") - getValue(b, "r0"));

  const xScale = scaleBand()
    .domain(data.map((d) => d.i))
    .range([0, width]);

  const yScale = scaleLinear().domain([-1.5, 3.5]).range([height, 0]);

  function colorCheck(d) {
    return getValue(d, "r0") <= 1 ? "rgb(53, 179, 46)" : "rgb(235, 83, 88)";
  }

  function handleColor(state, color) {
    if (dropValue === "all") return color;
    else if (dropValue === "ten largest") {
      if (tenLargestStates.includes(state)) return color;
      else return "rgb(211,211,211)";
    } else if (dropValue === "northeast") {
      if (Northeast.includes(state)) return color;
      else return "rgb(211,211,211)";
    } else if (dropValue === "west") {
      if (West.includes(state)) return color;
      else return "rgb(211,211,211)";
    } else if (dropValue === "midwest") {
      if (Midwest.includes(state)) return color;
      else return "rgb(211,211,211)";
    } else if (dropValue === "south") {
      if (South.includes(state)) return color;
      else return "rgb(211,211,211)";
    } else return color;
  }

  const circles = data.map((d, i) => (
    <g key={i}>
      <g transform={"translate(7,0)"}>
        <motion.rect
          initial={{ fill: handleColor(d.i, colorCheck(d)) }}
          animate={{ fill: handleColor(d.i, colorCheck(d)) }}
          transition={{ duration: 1 }}
          x={xScale(d.i)}
          y={yScale(getValue(d, "h90"))}
          width={10}
          height={Math.abs(
            yScale(getValue(d, "h90")) - yScale(getValue(d, "l90"))
          )}
          style={{
            stroke: handleColor(d.i, colorCheck(d)),
            opacity: 0.1,
          }}
          rx={4}
        />
        />
        <motion.rect
          initial={{ fill: handleColor(d.i, colorCheck(d)) }}
          animate={{ fill: handleColor(d.i, colorCheck(d)) }}
          transition={{ duration: 1 }}
          x={xScale(d.i)}
          y={yScale(getValue(d, "h50"))}
          width={10}
          height={Math.abs(
            yScale(getValue(d, "h50")) - yScale(getValue(d, "l50"))
          )}
          style={{
            stroke: handleColor(d.i, colorCheck(d)),
            strokeWidth: 1.5,
            opacity: 0.2,
          }}
          rx={4}
        />
      </g>
      <g transform={`translate(${xScale(d.i)},${yScale(getValue(d, "r0"))})`}>
        <motion.rect
          initial={{ stroke: handleColor(d.i, colorCheck(d)) }}
          animate={{ stroke: handleColor(d.i, colorCheck(d)) }}
          transition={{ duration: 1 }}
          width={ovalWidth}
          height={ovalHeight}
          rx={9}
          style={{
            fill: "white",
            strokeWidth: 1.5,
          }}
        />
        <motion.text
          initial={{ fill: handleColor(d.i, colorCheck(d)) }}
          animate={{ fill: handleColor(d.i, colorCheck(d)) }}
          transition={{ duration: 1 }}
          style={{
            fontSize: 10,
            fontWeight: 500,
          }}
          textAnchor="middle"
          dominantBaseline="middle"
          dy={ovalHeight / 2 + 1}
          dx={ovalWidth / 2}
        >
          {d.i}
        </motion.text>
      </g>
    </g>
  ));

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} width={width} count={10} />
          {circles}
        </g>
      </svg>
    </div>
  );
}

export default RangeDistPlot;
