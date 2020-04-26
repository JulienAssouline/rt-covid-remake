import React, { useState } from "react";
import RangeDistPlot from "./RangeDistPlot";

function RangeDistPlotContainer({ data }) {
  const [week, setWeek] = useState("Yesterday");

  function onClick(e) {
    setWeek(e.target.innerHTML);
  }

  return (
    <div>
      <div className="button-container">
        <button
          style={{
            fontWeight: week === "Yesterday" ? 700 : "normal",
          }}
          className="week-button"
          onClick={onClick}
        >
          Yesterday
        </button>
        <button
          style={{
            fontWeight: week === "Last Week" ? 700 : "normal",
          }}
          className="week-button"
          onClick={onClick}
        >
          Last Week
        </button>
        <button
          style={{
            fontWeight: week === "2 Weeks Ago" ? 700 : "normal",
          }}
          className="week-button"
          onClick={onClick}
        >
          2 Weeks Ago
        </button>
      </div>
      <RangeDistPlot data={data} week={week} />
    </div>
  );
}

export default RangeDistPlotContainer;
