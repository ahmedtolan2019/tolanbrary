//book model;
const Book = require('../models/book')
const Author = require('../models/author')


const express = require('express');
const {
    json
} = require('body-parser');
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();



//all books route
router.get('/', async (req, res) => {
    let query = Book.find()
    if (req.query.title != null && req.query.title !== '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore !== '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter !== '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (error) {
        console.log(error)
    }

})

//new book route
router.get('/new', async (req, res) => {
    renderFormpage(res, new Book(), 'new')
})

router.post('/', async (req, res) => {

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })


    saveCover(book, req.body.cover)

    try {
        const newBook = await book.save()


        res.redirect(`/books/${newBook.id}`)

    } catch {

        renderFormpage(res, book, 'new', true)

    }
})

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return

    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}


//show book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').exec()
        res.render('books/show', {
            book: book
        })
    } catch {
        res.redirect('/')
    }
})
//edit book
router.get('/:id/edit', async (req, res) => {
    try {
        
        const book = await Book.findById(req.params.id)
        renderFormpage(res, book, 'edit')
    } catch {
        renderFormpage(res, book, 'edit', true)
    }
})
//update book
router.put('/:id', async (req, res) => {
    let book

    try {
        book = await Book.findById(req.params.id)
        book.title = req.body.title,
            book.author = req.body.author,
            book.publishDate = new Date(req.body.publishDate),
            book.pageCount = req.body.pageCount,
            book.description = req.body.description
        if (req.body.cover != null && req.body.cover != '') {
            saveCover(book, req.body.cover)
        }
        console.log(author.id)
        await book.save()
        res.redirect(`/books/${book.id}`)
    } catch {
        if (book == null) {
            res.redirect('/')
        } else {
            renderFormpage(res, book, 'edit', 'updating', true)
        }
    }

})
//delete book
router.delete('/:id', async (req, res) => {
    let book
    try {
        
        book = await Book.findById(req.params.id) 
        await book.remove()
        res.redirect(`/books`)
    } catch{
        if(book == null){
            res.redirect('/')
        }else{
            res.redirect(`/books/${book.id}`, {
                errorMessage: 'could not remove book'
            })
        }
        
    }
})

//render form page function for new and edit routes
async function renderFormpage(res, book, form, errMessage = 'creating', hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = `error ${errMessage} book`;
        res.render(`books/${form}`, params)

    } catch {
        res.redirect('/books')
    }
}

module.exports = router