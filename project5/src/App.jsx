import React,{ useEffect, useState } from 'react'
import './App.css'
import SideNav from './Components/sideNav'

function App() {
  const [count, setCount] = useState(0);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  //This function is used to create a dropdown list to filter by type of brewery.
  const [selectedType, setSelectedType] = useState('');
  const typeList = [ 'micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor' ];

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
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
  };


  //We are getting the current position of the user.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });
  }, []);

  return (
    <div className="App">

      <div className="Current Location">
        Current Location: {longitude}, {latitude};
      </div>
      <h1>Hello Brewery</h1>
      <SideNav />

      <div className="filter">
        <input type="text" placeholder="Search by name" />

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


      </div>


      

    </div>
  )
}

export default App
