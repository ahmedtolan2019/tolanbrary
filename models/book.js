const mongoose = require('mongoose')

//upload path variable
const coverImageBasePath = 'uploads/bookCovers';

//path require
const path  = require('path')

//authorSchema
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String   
    },
    publishDate:{
        type: Date,
        required: true
    },
    createAtDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName:{
        type: String,
        required:true
        
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
            ref:'Author',
        required: true
    },
    pageCount:{
        type:Number,
            required:true
    }

    
})

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})
module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath=coverImageBasePath