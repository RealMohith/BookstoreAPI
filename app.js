require('dotenv').config();
const express = require('express');
const bookRoutes = require('./routes/book.route');

const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

