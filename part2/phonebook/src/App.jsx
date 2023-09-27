import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    phonebookService.getAll()
      .then(response => {
        setPersons(response)
        setFilteredPersons(response)
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
    phonebookService.create(newPerson)
    .then(response => { 
      setPersons(persons.concat(response))
      setFilteredPersons(filteredPersons.concat(response))
    })
  }
  const handleNameInput = (event) => setNewName(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    let filterValue = event.target.value
    setFilterValue(filterValue)
    filterValue !== '' ? setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))) : setFilteredPersons(persons)
  }

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name} ?`)) {
      phonebookService.deletePerson(person.id).then(()=>{
        setPersons(persons.filter(p => p.id != person.id))
        setFilteredPersons(filteredPersons.filter(p => p.id != person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h3>Add a New</h3>
      <NewForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Numbers filteredPersons={filteredPersons} handleDelete={handleDelete}/>
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

const Numbers = ({ filteredPersons, handleDelete }) => {
  return (filteredPersons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={()=>handleDelete(person)}>delete</button></div>)
  )
}

export default App