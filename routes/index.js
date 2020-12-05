const express = require('express')
const Book = require('../models/book')

const router = express.Router()

router.get('/',async(req, res)=>{
    let books = []
try {
    books = await Book.find().sort({createAtDate:'desc'}).limit(9).exec()
    
} catch (error) {
    console.log(error)
    books = []
}
res.render('index',{
    books: books
})

})
module.exports=router;