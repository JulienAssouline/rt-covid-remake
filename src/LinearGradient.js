import React from "react";

function LinearGradient({ state, height, yScale }) {
  const threshold = 1;

  const data = [
    { offset: 0, color: "rgb(235, 83, 88)" },
    { offset: yScale(threshold) / height, color: "rgb(235, 83, 88)" },
    { offset: yScale(threshold) / height, color: "rgb(53, 179, 46)" },
    { offset: 1, color: "rgb(53, 179, 46)" },
  ];

  return (
    <>
      <defs>
        <linearGradient
          gradientUnits={"userSpaceOnUse"}
          x1={0}
          y1={0}
          x2={0}
          y2={height}
          id={`states-${state}`}
        >
          {data.map((d, i) => (
            <stop key={i} offset={d.offset} stopColor={d.color} />
          ))}
        </linearGradient>
      </defs>
    </>
  );
}

export default LinearGradient;
