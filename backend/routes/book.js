const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require('../models/book');
const { authenticateToken } = require("./userAuth");

// Add book -- admin role (only admin can ADD or DELETE books)
router.post('/add-book', authenticateToken, async(req, res) => {
  try {
    // Authenticaton to check user-role is admin or not
    const {id} = req.headers;
    const user = await User.findById(id);
    if(user.role !== 'admin')
      return res.status(400).json({message: "you don't have access to perform admin work"})


    // const bookData = req.body;
    // const newbook = new Book(bookData);
    const newbook = new Book ({
      url : req.body.url, 
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    })
    await newbook.save();
    res.status(200).json({message: "Book Added Successfully"});
  } catch (error) {
    res.status(500).json({message: "internal Server error"});
  }
})

// Update book  -- admin role (only admin can Update book's details)
router.put('/update-book', authenticateToken, async(req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language
    });
    return res.status(200).json({message: "Book updated Successfully!"})

  } catch (error) {
    res.status(500).json({message: "internal Server error"});
  }
})

// Delete book -- admin role (only admin can Delete books)
router.delete('/delete-book', authenticateToken, async(req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message: "Book Deleted Successfully!"})

  } catch (error) {
    res.status(500).json({message: "internal Server error"});
  }
})

// Get all books -- (anyone)
router.get('/get-all-books', async(req, res) => {
  try {
    const books = await Book.find().sort({createdAt:-1});
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
})

// Get recently added books -- (anyone) 
router.get('/get-recent-books', async(req, res) => {
  try {
    const books = await Book.find().sort({createdAt:-1}).limit(4); // sorting on the basis of new books creation
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
})

// Get particular book detail -- (anyone) 
router.get('/get-book-by-id/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
})




module.exports = router;