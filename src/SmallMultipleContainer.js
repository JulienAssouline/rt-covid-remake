import React, { useMemo } from "react";
import { line, area } from "d3-shape";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeParse } from "d3-time-format";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import LinearGradient from "./LinearGradient";
import Tooltip from "./Tooltip";
import LineChart from "./LineChart";
import Path from "./Path";
import Title from "./Title";
import Rect from "./Rect";

import { statesLabels } from "./utils/helpers";

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

  const xScale = scaleTime()
    .domain([
      new Date("March 02 2020"),
      extent(data[0]["r0"], (el) => parseTime(el.d))[1],
    ])
    .range([0, width - 5]);

  const yScale = scaleLinear().domain([0, 4.5]).range([height, 0]);

  const path = useMemo(
    () =>
      line()
        .x((el) => {
          return xScale(parseTime(el.d));
        })
        .y((el) => yScale(el.c["r0"])),
    [parseTime, xScale, yScale]
  );

  const pathArea = useMemo(
    () =>
      area()
        .x((el) => xScale(parseTime(el.d)))
        .y0((d) => yScale(d.c["l90"]))
        .y1((d) => yScale(d.c["h90"])),
    [parseTime, xScale, yScale]
  );

  const lineCharts = data.map((d, i) => (
    <LineChart w={w} h={h} margin={margin}>
      <Title
        textLabel={statesLabels[i]}
        x={0}
        y={-20}
        styles={{ fontWeight: "bold" }}
      />
      <Title
        textLabel={d["r0"][d["r0"].length - 1].c["r0"].toFixed(2)}
        x={width - 30}
        y={-20}
        styles={{ fontWeight: "bold" }}
      />
      <AxisLeft yScale={yScale} width={width} count={5} />
      <AxisBottom xScale={xScale} height={height} />
      <LinearGradient state={d.i} height={height} yScale={yScale} />
      <Path
        pathFun={pathArea(d["r0"])}
        styles={{
          fill: `url(#states-${d.i})`,
          stroke: `url(#states-${d.i})`,
          strokeWidth: 3,
          opacity: 0.08,
        }}
      />
      <Path
        pathFun={path(d["r0"])}
        styles={{
          fill: "none",
          stroke: `url(#states-${d.i})`,
          strokeWidth: 1.5,
        }}
      />
      <Tooltip
        width={width}
        height={height}
        xScale={xScale}
        data={d["r0"]}
        parseTime={parseTime}
      />
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        styles={{ opacity: 1, fill: "none", stroke: "#eee" }}
      />
    </LineChart>
  ));

  return <div>{lineCharts}</div>;
}

export default SmallMultipleContainer;
