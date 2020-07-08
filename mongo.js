const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide a password like this => node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://testuser:${password}@cluster0.m5qvr.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })

}
else {
    const person = Person({
        name: name,
        number: number,
    })
    console.log('Veer sending...', person)

    person.save()
        .then(response => {
            console.log('person saved!')
            console.log(`Added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })

}