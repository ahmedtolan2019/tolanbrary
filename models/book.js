const mongoose = require('mongoose')



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
    coverImage:{
        type: Buffer,
        required:true
        
    },
    coverImageType:{
        type: String,
        required: true
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
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})
module.exports = mongoose.model('Book', bookSchema)