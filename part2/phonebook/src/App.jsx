import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleSubmit = (event) => {
    event.preventDefault()
    persons?.filter(person => person.name === newName).length === 0 ? setPersons(persons.concat({ 'name': newName, 'number': newNumber })) : alert(newName + ' is already added to PhoneBook')
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => setNewName(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    let filterValue = event.target.value
    setFilter(filterValue)
    filterValue !== '' ? setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))) : setFilteredPersons(persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
      <h3>Add a New</h3>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App