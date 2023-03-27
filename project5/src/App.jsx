import { useState } from 'react'
import './App.css'
import SideNav from './Components/sideNav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello Brewery</h1>
      <SideNav />
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
    </div>
  )
}

export default App
