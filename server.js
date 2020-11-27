//dotenv
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//packages
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

const bodyParser = require('body-parser')


//routes
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

//set
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`)
app.set('layout','layouts/layout')

//use
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)
app.use('/authors', authorsRouter)



//databse setup
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    //login Db
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open',()=>console.log('connected to mongoDB'))


//listen
app.listen(process.env.PORT || 3000)
