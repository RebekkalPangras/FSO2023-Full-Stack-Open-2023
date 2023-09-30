const express = require('express')

const app = express()
app.use(express.json())

const persons = [
    {
        "name": "Arto Hellas",
        "id": 1,
        "number": "39-44-5323521"
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Alex",
        "number": "123-1234-1234",
        "id": 5
    },
    {
        "name": "Mary Alex",
        "number": "234-3456-234",
        "id": 6
    },
    {
        "name": "Rebecca Venkat",
        "number": "403-234-0987",
        "id": 7
    },
    {
        "name": "Venzet Krish",
        "number": "403-333-3333",
        "id": 8
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.listen(3001, () => console.log("Started listening on port 3001"))