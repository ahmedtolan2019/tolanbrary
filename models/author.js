const mongoose = require('mongoose')


//authorSchema
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)