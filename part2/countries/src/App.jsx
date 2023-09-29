import { useEffect, useState } from 'react'
import './App.css'
import countries from './services/countries'

function App() {
  const [filterValue, setFilterValue] = useState('')
  const [countryData, setCountryData] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countries.readAll().then(response => setCountryData(response))
  }, [])

  const handleFilter = (event) => {
    const name = event.target.value;
    setFilterValue(name)
    var filteredCountries = countryData.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
    setFilteredCountries(filteredCountries)
  }

  const showCountry = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      find countries <input value={filterValue} onChange={handleFilter} />
      <CountryFilter filteredCountries={filteredCountries} showCountry={showCountry} />
    </div>
  )
}

const CountryFilter = ({ filteredCountries, showCountry }) => {
  if (filteredCountries.length != null) {
    if (filteredCountries.length > 10) return (<div>Too many matches specify another filter</div>)
    else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }
    else {
      return (
        filteredCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => showCountry(country)}>show</button></div>)
      )
    }
  } else {
    return <div></div>
  }
}

const Country = ({ country }) => {
  const flagStyle = {
    fontSize: 100
  }
  const languages = Object.values(country["languages"])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <div style={flagStyle}>{country.flag}</div>
    </div>
  )
}

export default App
