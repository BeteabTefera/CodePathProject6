import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";


const BrewChart = () => {
    const [histData, setHistData] = useState(null);
    const [histData2, setHistData2] = useState(null);
    //MetaData per Type
    const typeList = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor']
    useEffect(() => {
        const getBrewHist = async () => {
            const promises = typeList.map(async (type) => {
                const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=${type}`);
                const json = await response.json();
                return { type: type, data: json };
            });
            const results = await Promise.all(promises);
            setHistData2(results);
        };
        getBrewHist().catch(console.error);
    }, []);



    //MetaData per Country
    const countryList = ['austria', 'england', 'france', 'Isle_of_Man', 'ireland', 'poland', 'portugal', 'scotland', 'south_korea']    
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
              <BarChart
                width={1000}
                height={400}
                data={countryData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 100,
                    bottom: 30,
                  }}
              >
                <CartesianGrid stroke="#ccc"  strokeDasharray="5 5" />
                <XAxis
                  dataKey="name"
                  label={{ value: "Country", position: "bottom" }}
                />
                <YAxis
                  dataKey="breweries"
                  label={{ position: "left", angle: -90, value: "Total Breweries" }}
                />
                <Tooltip />
                <Bar dataKey="breweries" fill="#8884d8"/>
              </BarChart>
            </div>
          ) : null}

          {histData2 ? (// rendering only if API call actually returned us data
            <div>
              <br></br>
              <h2>Brewery By Type</h2>
              <LineChart 
                width={800}
                height={400}
                data={histData2}
                margin={{
                    top: 10,
                    right: 30,
                    left: 100,
                    bottom: 30,
                  }}
              >
                <CartesianGrid stroke="#ccc"  strokeDasharray="5 5" />
                <XAxis
                  dataKey="type"
                  type="category"
                  label={{ value: "Brewery Type", position: "bottom" }}
                />
                <YAxis
                  dataKey="data.total"
                  type="number"
                  domain={[0, 5000]}
                  label={{ position: "left", angle: -90 }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="data.total" stroke="#8884d8"/>
              </LineChart>
            </div>
          ) : null}
        </div>
      );
    
  };

export default BrewChart;
