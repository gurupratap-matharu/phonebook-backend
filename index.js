const express = require('express')

app = express()
app.use(express.json())


const persons = [
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<div>Phonebook has info of ${persons.length} people</div>${date}`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)

})

app.post('/', (request, response) => {
    response.send('working on post. hold one ;D')
})

app.delete('/', (request, response) => {

})

app.get('/', (request, response) => {

})
const PORT = 3001
app.listen(PORT)
console.log(`Server running in port ${PORT}`)