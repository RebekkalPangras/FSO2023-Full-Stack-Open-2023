import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const url = "http://localhost:3001/persons"

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { 'name': newName, 'number': newNumber }
    persons.filter(person => person.name === newName).length === 0 ? addNewContact(newPerson) : [alert(newName + ' is already added to PhoneBook'), setFilteredPersons(persons)]
    setNewName('')
    setNewNumber('')
    setFilterValue('')
  }
  const addNewContact = (newPerson) => {
    axios.post(url, newPerson)
    .then(axios.get(url)
    .then(response => { 
      setPersons(response.data)
      setFilteredPersons(response.data)
    }))
  }
  const handleNameInput = (event) => setNewName(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    let filterValue = event.target.value
    setFilterValue(filterValue)
    filterValue !== '' ? setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))) : setFilteredPersons(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h3>Add a New</h3>
      <NewForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Numbers filteredPersons={filteredPersons} />
    </div>
  )
}

const Filter = ({ filterValue, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilter} />
    </div>
  )
}

const NewForm = ({ newName, newNumber, handleNameInput, handleNumberInput, handleSubmit }) => {
  return (<form>
    <div>
      name: <input value={newName} onChange={handleNameInput} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberInput} />
    </div>
    <div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  </form>)
}

const Numbers = ({ filteredPersons }) => {
  return (filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)
  )
}

export default App