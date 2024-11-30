if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

// Middleware
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.use('/', indexRouter)
app.use('/authors', authorRouter)

// Mongoose Connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Mongoose'))
    .catch(err => console.error('Mongoose connection error:', err))

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
