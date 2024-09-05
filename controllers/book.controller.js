const { z } = require('zod');
const bookModel = require('../models/book.model');

// I have used Zod schemas for input validation so that code looks cleaner
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().positive("Price must be a positive number"),
  genre: z.string().optional(),
  publishedDate: z.string().optional(),
  inStock: z.boolean().default(true).optional()
});

const bookUpdateSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(),
  publishedDate: z.string().optional(),
  price: z.number().positive().optional(),
  inStock: z.boolean().optional()
});

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Database error"});
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({error: "Book not found"});
    }
  } catch (err) {
    res.status(500).json({ error:'Database error'});
  }
};

exports.createBook = async (req, res) => {
  try {
    const validatedData = bookSchema.parse(req.body);
    const id = await bookModel.createBook(validatedData);
    res.status(201).json({id});
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const validatedData = bookUpdateSchema.parse(req.body);
    await bookModel.updateBook(id, validatedData);
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await bookModel.deleteBook(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};
