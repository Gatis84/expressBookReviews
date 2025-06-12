# Bookshop RESTful API
Project Overview

This project is designed to simulate the back-end of an online retailer selling books. The application allows users to store, retrieve, and manage book ratings and reviews. A RESTful web service that allows users to interact with a database of books, reviews, and user data.

The web service is built using Node.js and Express.js and provides various endpoints for interacting with books, reviews, and users.
  
## Features

### Book Management

- Retrieve a list of all books available in the bookshop.
- Search for books based on ISBN, author name, or title.

### Review Management

- Retrieve reviews/comments for specified books.
- Add a new review for a book (**only logged-in users**).
- Modify a book review (**only users who posted the review**).
- Delete a book review (**only users who posted the review**).

### User Management

- Register a new user in the application.
- Login to the application using credentials.
- Session-based and JWT authentication to ensure that only logged-in users can add, modify, or delete reviews.

### Concurrent Access:
Multiple users can interact with the application simultaneously to view and manage book reviews without waiting for each other's operations.