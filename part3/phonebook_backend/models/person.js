require('dotenv').config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

mongoose.connect(uri)
    .then(result => console.log("Connected to MongoDB"))
    .catch(error => console.log("Error connecting to MongoDB", error))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.favoriteFoods
    }
  })
  
module.exports = mongoose.model('Person', personSchema)

