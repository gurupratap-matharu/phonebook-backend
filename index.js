require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')

app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req['body']) })
morgan.token('type', function (req, res) { return req.headers['content-type'] })
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res),
        tokens.type(req, res)
    ].join(' ')
}))


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.get('/', (request, response) => {
    response.send('<h1>Veer your secret phonebook</h1>')
})


app.get('/info', (request, response) => {
    Person
        .find({})
        .then(persons => {
            const date = new Date()
            const info = `<div>Phonebook has info of ${persons.length} people</div>${date}`
            response.send(info)
        })
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    Person.findById(id)
        .then(person => {
            response.json(person)
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: "name missing"
        })
    }
    if (body.number === undefined) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    const person = new Person({
        "name": body.name,
        "number": body.number,
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => {
        return person.id !== id
    })
    response.status(204).end()
})


app.use(unknownEndpoint)

let PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

