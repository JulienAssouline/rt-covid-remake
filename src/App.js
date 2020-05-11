import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import RangeDistPlotContainer from "./RangeDistPlotContainer";
import SmallMultipleContainer from "./SmallMultipleContainer";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://d14wlfuexuxgcm.cloudfront.net/covid/parsed_for_js_mcmc.json.gz?v=12";
      const result = await axios(url);
      setData(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>...loading</div>;

  const dataFiltered = data.state_data.filter((d) => d.i !== "US");

  function sortByState(a, b) {
    if (a.i < b.i) {
      return -1;
    }
    if (a.i > b.i) {
      return 1;
    }
    return 0;
  }

  dataFiltered.sort(sortByState);

  return (
    <div className="App">
      <RangeDistPlotContainer data={dataFiltered} />
      <SmallMultipleContainer data={dataFiltered} />
    </div>
  );
}

export default App;
