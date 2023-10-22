const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

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
    const body = request.body
    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    if (body.name === undefined || body.number === undefined) return response.status(400).send({ error: "Name or Number missing" })

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => response.json(savedPerson))
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/person/:id', (request, response) => {
    console.log("Entered Findbyid")
    console.log(request.params.id)
    Person.findById(request.params.id,(err, person)=> {
        console.log(person)
        if(err) response.status(404).send({ 'error': 'no data exists for the given id' })
        else response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(response.status(204).end())
})

const PORT = process.env.port || 3001
app.listen(PORT, () => console.log("Started listening on port 3001"))