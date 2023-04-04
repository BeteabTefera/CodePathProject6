import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";


const BrewChart = () => {
    const [histData, setHistData] = useState(null);
    
    //MetaData per Country
    const countryList = ['austria', 'england', 'france', 'Isle_of_Man', 'ireland', 'poland', 'portugal', 'scotland', 'south_korea', 'united_states']
    
        useEffect(() => {
            const getBrewHist = async () => {
                const promises = countryList.map(async (country) => {
                    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/meta?by_country=${country}`);
                    const json = await response.json();
                    return { country: country, data: json };
                });
                const results = await Promise.all(promises);
                setHistData(results);
            };
            getBrewHist().catch(console.error);
        }, []);

      const countryData = histData
        ? histData.map((item) => ({
              name: item.country,
              breweries: item.data["total"]
          }))
        : [];

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              <br></br>
              <h2>Brewery By Country</h2>
              <LineChart
                width={800}
                height={400}
                data={countryData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 150,
                    bottom: 30,
                  }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="breweries"
                  type="number"
                  domain={[0, "dataMax"]}
                  label={{ value: "Total Breweries", position: "bottom" }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  label={{ position: "left", angle: -90 }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="breweries" stroke="#8884d8" />
              </LineChart>
            </div>
          ) : null}
        </div>
      );
    
  };

export default BrewChart;
