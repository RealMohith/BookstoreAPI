
# Bookstore api

Building a Simple API for a Bookstore 


## overview

The API is fully functional with the ability to handle all specified CRUD operations.
A JSON response is returned for each request, either with the requested data or an appropriate error message
## Run Locally

Clone the project

```bash
  git clone https://github.com/RealMohith/BookstoreAPI.git
```

Go to the project directory

```bash
  cd BookstoreAPI
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm app.js
```

## Tech used

node.js
Express
myslq2

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookstore
PORT=3000


replace the variables with your data


## Db setup

CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(255),
  publishedDate DATE,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  inStock BOOLEAN NOT NULL DEFAULT TRUE
);
