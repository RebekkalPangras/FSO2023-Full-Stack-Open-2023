const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log('Give password as an argument');
    process.exit(1);
}

const password = process.argv[2];
const uri = `mongodb+srv://root:${password}@cluster0.nyq1agk.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose.connect(uri);
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);
if (process.argv.length > 3) {
    const personName = process.argv[3];
    const phoneNumber = process.argv[4];

    const person = new Person({
        name: personName,
        number: phoneNumber,
    });

    person.save().then(result => {
        console.log(`Added ${personName} number ${phoneNumber} to the phonebook`);
        mongoose.connection.close();
    }).catch(error => {
        console.error('Error saving the person:', error);
        mongoose.connection.close();
    });
} else {
    console.log('Phonebook:');
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    }).catch(error => {
        console.error('Error finding persons:', error);
        mongoose.connection.close();
    });

}

