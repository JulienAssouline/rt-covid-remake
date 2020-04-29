import React, { useState } from "react";
import RangeDistPlot from "./RangeDistPlot";
import { Button, Select } from "antd";

import "antd/dist/antd.css";

const Option = Select.Option;

function RangeDistPlotContainer({ data }) {
  const [week, setWeek] = useState("Yesterday");
  const [value, setValue] = useState("all");

  function onClick(e) {
    const text = e.target.childNodes[0].innerHTML
      ? e.target.childNodes[0].innerHTML
      : e.target.innerHTML;
    setWeek(text);
  }

  function handleChange(v) {
    setValue(v);
  }

  return (
    <div>
      <div className="inputs-container">
        <div className="button-container">
          <Button
            className="week-button"
            style={{
              fontWeight: week === "Yesterday" ? 700 : "normal",
            }}
            onClick={onClick}
          >
            Yesterday
          </Button>
          <Button
            style={{
              fontWeight: week === "Last Week" ? 700 : "normal",
            }}
            className="week-button"
            onClick={onClick}
          >
            Last Week
          </Button>
          <Button
            style={{
              fontWeight: week === "2 Weeks Ago" ? 700 : "normal",
            }}
            className="week-button"
            onClick={onClick}
          >
            2 Weeks Ago
          </Button>
        </div>
        <div className="dropdown-container">
          <Select
            defaultValue="all"
            value={value}
            style={{ width: 150 }}
            onChange={handleChange}
          >
            <Option value="all">All</Option>
            <Option value="ten largest">Ten Largest</Option>
            <Option value="northeast">Northeast</Option>
            <Option value="west">West</Option>
            <Option value="midwest">Midwest</Option>
            <Option value="south">South</Option>
          </Select>
        </div>
      </div>
      <RangeDistPlot data={data} week={week} dropValue={value} />
    </div>
  );
}

export default RangeDistPlotContainer;
