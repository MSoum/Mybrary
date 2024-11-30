const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({})
    res.render('authors/index', {authors: authors})
  } catch (error) {
    res.redirect('/')
  }
})

// New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Authors Route
router.post('/', async (req, res) => {
  const { name } = req.body // Destructure name from req.body
  const author = new Author({ name }) // Create new Author instance

  try {
    // Save the author to the database
    await author.save()
    res.redirect('/authors') // Redirect to the authors list page on success
  } catch (err) {
    console.error('Error creating author:', err) // Log error for debugging
    res.status(400).render('authors/new', {
      author, // Pass back the partially filled author object
      errMessage: err.message || 'Error Creating Author...' // Display specific or default error message
    })
  }
})



module.exports = router