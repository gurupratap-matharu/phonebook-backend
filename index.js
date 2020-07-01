const express = require('express')

app = express()
app.use(express.json())


let persons = [
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
        "name": "Mummy",
        "number": "12341231234",
        "id": 12
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Veer your secret phonebook</h1>')
})


app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<div>Phonebook has info of ${persons.length} people</div>${date}`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const getId = () => Math.floor(Math.random() * Math.floor(10000000))

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(`Body=${body}`)

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    const person = {
        "name": body.name,
        "number": body.number,
        "id": getId()
    }
    console.log(`Created= ${person}`)
    persons = persons.concat(person)
    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => {
        return person.id !== id
    })
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running in port ${PORT}`)