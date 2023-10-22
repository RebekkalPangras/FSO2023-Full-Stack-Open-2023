const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :req[content-length] :response-time ms :req-body'));

morgan.token('req-body', req => JSON.stringify(req.body))

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.post('/api/persons', (request, response) => {
    const max = 100
    const min = 8
    const person = request.body

    if (person.name === undefined || person.number === undefined) return response.status(400).send({ error: "Name or Number missing" })
    if ((persons.filter(p => p.name === person.name)).length > 0) return response.status(400).send({ error: "Name must be unique" })

    person.id = Math.floor(Math.random() * (max - min) + min)
    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/persons', (request, response) => {
    person.find({}).then(persons=> response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
    const reqId = Number(request.params.id)
    const person = persons.find(person => person.id === reqId)
    if (person) response.json(person)
    else response.status(404).send({ 'error': 'no data exists for the given id' })
})

app.delete('/api/persons/:id', (request, response) => {
    const reqId = Number(request.params.id)
    persons = persons.filter(person => person.id != reqId)
    response.status(204).end()
})

const PORT = process.env.port || 3001
app.listen(PORT, () => console.log("Started listening on port 3001"))