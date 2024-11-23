const express = require('express')
const app = express()
const expresslayouts = require('express-ejs-layouts')

app.set('view engine','ejs')
app.set('view',__dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expresslayouts)
app.use(express.static('public'))
app.listen(process.env.PORT || 3000)