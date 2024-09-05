const db = require('../configure/databases_config');

const getAllBooks = async () => {
  const [rows] = await db.query('SELECT * FROM books');
  return rows;
};

const getBookById = async (id) => {
  const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
};

const createBook = async (book) => {
  const { title, author, genre, publishedDate, price, inStock } = book;
  const [result] = await db.query('INSERT INTO books (title, author, genre, publishedDate, price, inStock) VALUES (?, ?, ?, ?, ?, ?)', [title, author, genre, publishedDate, price, inStock]);
  return result.insertId;
};

const updateBook = async (id, book) => {
  const { title, author, genre, publishedDate, price, inStock } = book;
  await db.query('UPDATE books SET title = ?, author = ?, genre = ?, publishedDate = ?, price = ?, inStock = ? WHERE id = ?', [title, author, genre, publishedDate, price, inStock, id]);
};

const deleteBook = async (id) => {
  await db.query('DELETE FROM books WHERE id = ?', [id]);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
