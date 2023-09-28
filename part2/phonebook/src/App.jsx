import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
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
    const existingContact = persons.filter(person => person.name === newName)
    existingContact.length === 0 ? addNewContact(newPerson) : updateContact(...existingContact, newPerson)
    setNewName('')
    setNewNumber('')
    setFilterValue('')
  }
  const addNewContact = (newPerson) => {
    phonebookService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setFilteredPersons(filteredPersons.concat(response))
        setMessage({'isError': false, 'content': `Added ${newPerson.name}`})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateContact = (existingContact, person) => {
    if (confirm(`${person.name} is already to phonebook, replace the old number with a new one?`)) {
      phonebookService.update({ 'name': person.name, 'id': existingContact.id, 'number': person.number }).then(response => {
        setPersons(persons.map(p => p.id == existingContact.id ? response : p))
        setFilteredPersons(filteredPersons.map(p => p.id == existingContact.id ? response : p))
        setMessage({'isError': false, 'content': `Updated ${person.name}`})
      }).catch(error => {
        setMessage({'isError': true, 'content': `Information of ${person.name} has already been removed from server`})
      }).finally(()=> {
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameInput = (event) => setNewName(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => {
    let filterValue = event.target.value
    setFilterValue(filterValue)
    filterValue !== '' ? setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))) : setFilteredPersons(persons)
  }

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      phonebookService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => p.id != person.id))
        setFilteredPersons(filteredPersons.filter(p => p.id != person.id))
        setMessage({'isError': false, 'content': `Deleted ${person.name}`})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <h3>Add a New</h3>
      <NewForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Numbers filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

const Notification = ({ message }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) return null
  if(message.isError) {
    messageStyle.color='red'
  }
  return (
    <div style={messageStyle}>
      {message.content}
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
  return (filteredPersons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>)
  )
}

export default App