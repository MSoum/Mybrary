const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')



// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name =new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {authors: authors, searchOptions : req.query})
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
  const author = new Author({ name : req.body.name }) // Create new Author instance

  try {
    // Save the author to the database
    const newAuthor = await author.save()
    res.redirect(`authors/${newAuthor.id}`) // Redirect to the authors list page on success
  } catch (err) {
    console.error('Error creating author:', err) // Log error for debugging
    res.status(400).render('authors/new', {
      author, // Pass back the partially filled author object
      errMessage: err.message || 'Error Creating Author...' // Display specific or default error message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch (err){
    console.log(err)
    res.redirect('/')
  }
})

router.get('/:id/edit', async (req,res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })
  } catch (error) {
    res.redirect('/authors')
  }
})

router.put('/:id', async (req,res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    author.name = req.body.name
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch {
    if (author == null){
      res.redirect('/')
    } else{
      res.render('authors/edit', {
        author : author,
        errMessage: err.message || 'Error updating Author...' // Display specific or default error message
      })
    }
  }
}) 

router.delete('/:id', async (req,res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.remove()
    res.redirect('/authors')
  } catch {
    if (author == null){
      res.redirect('/')
    } else{
      res.redirect(`/authors/${author.id}`)
    }
  }
}) 

module.exports = router