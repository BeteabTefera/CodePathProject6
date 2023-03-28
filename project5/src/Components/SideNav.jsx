import React, { useEffect, useState } from 'react'

function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

const SideNav = ({longitude, latitude}) => {
  const [breweryNearList, setBreweryNearList] = useState([]);

  //this functions fetches the breweries near you
  const fetchBreweriesNear = async () => {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=10`);
    const json = await response.json();
    setBreweryNearList(json);    
  };

  useEffect(() => {
    fetchBreweriesNear().catch(console.error);
  }, []);


  return (
    <div className="sidenav"> 
      <h2> Brewery Near You </h2>
      <p> This is a list of breweries near you. </p>
      <ul>
        {breweryNearList.map((brewery) => (
          <li className='sideNav-list' key={brewery.id}>
              <h2>{brewery.name}</h2>
              <p>{brewery.street}</p>
              <p>{brewery.city}</p>
              <p>{brewery.state}</p>
              <p>{formatPhoneNumber(brewery.phone)}</p>
              <a href={brewery.website_url} target="_blank">
                  <button className="button">
                      StoreLink
                  </button>
              </a>
          </li>
        ))}
      </ul>
    </div>


  );
};
export default SideNav;