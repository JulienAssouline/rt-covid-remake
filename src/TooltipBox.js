import React from "react";

function TooltipBox({ x, y, info, display }) {
  const paddingX = x > 200 ? -140 : 40;
  return (
    <foreignObject x={x + paddingX} y={y + 10} width={110} height={50}>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,.5)",
          opacity: 1,
          padding: 10,
          width: 109,
          height: 49,
          display: !display ? "none" : "block",
          textAlign: "left",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: 12 }}>{info.date}</span>
        <br></br>
        <span style={{ fontSize: 12 }}>
          Rt: {info.Rt ? info.Rt.toFixed(1) : null}
        </span>
      </div>
    </foreignObject>
  );
}

export default TooltipBox;
