import React, { Component, useEffect, useState } from "react";

const BrewChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              
            </div>
          ) : null}
        </div>
      );
    
  };

export default BrewChart;