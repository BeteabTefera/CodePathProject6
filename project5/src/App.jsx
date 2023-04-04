import React, { useEffect, useState } from 'react'
import './App.css'
import SideNav from "./Components/SideNav";
import { Link } from 'react-router-dom';

function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

function App() {
  //This function fetches all the breweries in the US.
  const [breweryList, setBreweryList] = useState(null);
  const [filteredBreweryList, setFilteredBreweryList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  

  const fetchBreweries = async () => {
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=200');
    const json = await response.json();
    setBreweryList(json);


  };
  useEffect(() => {
    fetchBreweries().catch(console.error);
  }, []);

  //This function is used to filter the breweries by name.
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredData = breweryList.filter((item) =>
        Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredBreweryList(filteredData);
    } else {
      setFilteredBreweryList(breweryList);
    }
  };

  //This FUNCTION is used to filter the breweries by type.
  const filterByType = (selectedType) => {
    if (selectedType !== '') {
      const filteredData = breweryList.filter((item) =>
        Object.values(item)
          .join('')
          .toLowerCase()
          .includes(selectedType.toLowerCase())
      )
      setFilteredBreweryList(filteredData);
    } else {
      setFilteredBreweryList(breweryList);
    }
  };

  //This FUNCTION is used to filter the breweries by state.
  const filterByState = (selectedState) => {
    if (selectedState !== '') {
      const filteredData = breweryList.filter((item) =>
        Object.values(item)
          .join('')
          .toLowerCase()
          .includes(selectedState.toLowerCase())
      )
      setFilteredBreweryList(filteredData);
    } else {
      setFilteredBreweryList(breweryList);
    }
  };
  
  //This function is used to create a dropdown list to filter by type of brewery.
  const [selectedType, setSelectedType] = useState('');
  const typeList = [ 'micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor' ];

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
    filterByType(e.target.value);
  };

  //This function is used to create a dropdown list of us states.
  const [selectedState, setSelectedState] = useState('');
  const stateList = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const handleStateSelect = (e) => {
    setSelectedState(e.target.value);
    filterByState(e.target.value);
  };


  //We are getting the current position of the user.
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude.toFixed(4));
      setLatitude(position.coords.latitude.toFixed(4));
    });
  }, []);

  return (
    <div className="App">
      Current Location: {latitude}, {longitude}
      <h1>Hello Brewery🍺</h1>

      <div className="filter">
        <input type="text" placeholder="Search by name" onChange={(inputString) => searchItems(inputString.target.value)}/>

        <select value={selectedState} onChange={handleStateSelect}>
          <option value="">Select a state</option>
          {stateList.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select value={selectedType} onChange={handleTypeSelect}>
          <option value="">Select a brewery type</option>
          {typeList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="Brewery List">
        {searchInput.length > 0 || selectedType.length > 0 || selectedState.length > 0
          ? filteredBreweryList.map((brewery) => (
              <div key={brewery.id}>
                <h2>{brewery.name}</h2>
                <p>Brewery Type: {brewery.brewery_type.toUpperCase()}</p>
                <p>{formatPhoneNumber(brewery.phone)}</p>
                <Link 
                      to={`/brewDetail/${brewery.id}`}
                      key={brewery.id}
                    >
                      <button className="button">
                          More Info
                      </button>
                </Link>
              </div>
            ))
          : breweryList &&  breweryList.map((brewery) => (
              <ul>
                <li key={brewery.id}>
                    <h2>{brewery.name}</h2>
                    <p>Brewery Type: {brewery.brewery_type.toUpperCase()}</p>
                    <p>{formatPhoneNumber(brewery.phone)}</p>
                    <Link 
                      to={`/brewDetail/${brewery.id}`}
                      key={brewery.id}
                    >
                      <button className="button">
                          More Info
                      </button>
                    </Link>

  
                </li>
              </ul>
            ))
        }

      </div>
    </div>
  )
}

export default App
