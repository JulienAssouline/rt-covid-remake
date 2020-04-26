import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import RangeDistPlotContainer from "./RangeDistPlotContainer";
import SmallMultipleContainer from "./SmallMultipleContainer";
import TooltipBox from "./TooltipBox";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://d14wlfuexuxgcm.cloudfront.net/covid/parsed_for_js_mcmc.json.gz?v=12";
      const result = await axios(url);
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) return <div>...loading</div>;

  return (
    <div className="App">
      <RangeDistPlotContainer data={data.state_data} />
      <SmallMultipleContainer data={data.state_data} />
    </div>
  );
}

export default App;
