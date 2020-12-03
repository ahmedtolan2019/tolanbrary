const express = require('express')

const bodyParser = require('body-parser')
const router = express.Router()

//author model
const Author = require('../models/author')
//author model
const Book = require('../models/book')
const { localsName } = require('ejs')

//all authors route
router.get('/', async(req, res) => {
    let searchOptions={}
    if(req.query.name != null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
       
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    })
})

router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        
       
        res.redirect('/authors')
    } catch(err) {
        
        res.render('authors/new', {
            author: author,
            errorMessage: 'error creating author'
            
        })
    }

})

//show author
router.get('/:id', async(req, res)=>{
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author:author.id}).limit(6).exec()
        
        res.render('authors/show',{
            author:author,
            booksByAuthor: books
        })
    } catch {
        res.redirect('/')
    }
})

//edit author
router.get('/:id/edit', async(req, res)=>{   

    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit',{
            author:author
        })  
        
    } catch(err) {        
        res.redirect('/authors')
    }
})
 //update author
router.put('/:id', async(req, res)=>{
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch (err) {
        if(author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit', {
                author:author,
                errorMessage:"error updating author"
            })
        }
    }
})

//delete author
router.delete('/:id', async(req, res)=>{
    let author
    try {
        
        author = await Author.findById(req.params.id) 
        await author.remove()
        res.redirect(`/authors`)
    } catch{
        if(author == null){
            res.redirect('/')
        }else{                      
            res.redirect(`/authors/${author.id}`)
        }
        
    }
})

module.exports = router;