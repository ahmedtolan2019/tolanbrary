//dotenv
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//packages
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')


//routes
const indexRouter = require('./routes/index')

//set
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`)
app.set('layout','layouts/layout')

//use
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)

//databse setup
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true
})
    //login Db
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open',()=>console.log('connected to mongoDB'))


//listen
app.listen(process.env.PORT || 3000)
