import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

const BrewDetail = () => {

    let params = useParams();
    const [fullDetails, setFullDetails] = useState({});

    useEffect(() => {
        const getBreweryDetails = async () => {
            const details = await fetch(
                `https://api.openbrewerydb.org/v1/breweries/${params.symbol}`
            );
            const detailsJson = await details.json();
            setFullDetails(detailsJson);
        };
        getBreweryDetails().catch(console.error);
    }, []);


  return (
    <div className="brewery-details">
        <h1>{fullDetails.name}</h1>
        <table>
                <tbody> 
                    <tr>
                    <th>Brewery Type </th>
                    <td>{fullDetails.brewery_type ? fullDetails.brewery_type.toUpperCase() : ''}</td>
                    </tr>

                    <tr>
                    <th>Website </th>
                    <td>
                        <a href={fullDetails.website_url} target="_blank">Link</a> <br />
                    </td>
                    </tr>

                    <tr>
                    <th>Adress </th>
                    <td>
                        {fullDetails.street} <br />
                    </td>
                    </tr>

                    <tr>
                    <th>City</th>
                    <td> 
                        {fullDetails.city} <br />
                    </td>
                    </tr>

                    <tr>
                    <th>State </th>
                    <td> 
                        {fullDetails.state} <br />
                    </td>
                    </tr>

                    <tr>
                    <th>Country </th>
                    <td> 
                        {fullDetails.country} <br />
                    </td>

                    </tr>
                    <tr>
                    <th>Phone Number</th>
                    <td> 
                        {formatPhoneNumber(fullDetails.phone)} <br />
                    </td>
                    </tr>
                </tbody>
            </table>
    </div>
  );
};

export default BrewDetail;