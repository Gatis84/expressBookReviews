const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//const axios = require('axios'); //npm install axios


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  if (users.some(user => user.username === username)) {
    console.log(users);
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User " + username + " registered successfully" });
});

// // Get the book list available in the shop
/*public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
}); */

//same code as above but with promises
/*public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  })
  .then(data => res.json(data))
  .catch(err => res.status(500).json({ error: "Failed to fetch books" }));
}); */

// same code as above but with async/await
public_users.get('/', async function (req, res) {
  try {
    // Simulate async operation
    const getBooks = async () => books;
    const data = await getBooks();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get book details based on ISBN
/*public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});*/

// same code as above but using Promise Callbacks
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({ message: err }));
});

// same code as above but using axios
// Simulate an external API by calling your own endpoint
/*public_users.get('/isbn/:isbn/axios', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    // Simulate fetching from an external API (here, just calling your own API)
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
}); */


// Get book details based on author
/* public_users.get('/author/:author', function (req, res) {
  const authorQuery = req.params.author.trim().toLowerCase();
  const booksByAuthor = Object.values(books).filter(book =>
    book.author && book.author.trim().toLowerCase() === authorQuery
  );

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
}); */

// same code as above but using Promise Callbacks
public_users.get('/author/:author', function (req, res) {
  const authorQuery = req.params.author.trim().toLowerCase();
  new Promise((resolve, reject) => {
    const booksByAuthor = Object.values(books).filter(book =>
      book.author && book.author.trim().toLowerCase() === authorQuery
    );
    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject("No books found for this author");
    }
  })
    .then(books => res.status(200).json(books))
    .catch(err => res.status(404).json({ message: err }));
});

//using axios to get book details based on author
/* public_users.get('/author/:author/axios', async function (req, res) {
  const author = req.params.author;
  try {
    // Simulate fetching from an external API (here, just calling your own API)
    const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "No books found for this author" });
  }
}); */

// Get all books based on title
/* public_users.get('/title/:title', function (req, res) {
  const titleQuery = req.params.title.trim().toLowerCase();
  const booksByTitle = Object.values(books).filter(book =>
    book.title && book.title.trim().toLowerCase() === titleQuery
  );

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
}); */

// same code as above but using Promise Callbacks
public_users.get('/title/:title', function (req, res) {
  const titleQuery = req.params.title.trim().toLowerCase();
  new Promise((resolve, reject) => {
    const booksByTitle = Object.values(books).filter(book =>
      book.title && book.title.trim().toLowerCase() === titleQuery
    );
    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject("No books found with this title");
    }
  })
    .then(books => res.status(200).json(books))
    .catch(err => res.status(404).json({ message: err }));
});

//  same code as above but using async/await axios
public_users.get('/title/:title/axios', async function (req, res) {
  const title = req.params.title;
  try {
    // Simulate fetching from an external API (here, just calling your own API)
    const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: "No books found with this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn] && books[isbn].reviews) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
});

module.exports.general = public_users;
