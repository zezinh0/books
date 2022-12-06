import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  port: '...',
  host: '...',
  user: '...',
  password: '...',
  database: '...',
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connection with DB');
  }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hi, It´s the Backend');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM test.books';
  db.query(q, (err, books) => {
    if (err) return res.json(err);
    return res.json(books);
  });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been created successfully');
  });
});

app.delete('/books/:id', (req, res) => {
  const book_id = req.params.id;

  const q = 'DELETE FROM books WHERE id= ?';

  db.query(q, [book_id], (error, data) => {
    if (error) return res.json(error);
    return res.json('Book has been removed successfully');
  });
});

app.put('/books/:id', (req, res) => {
  const book_id = req.params.id;

  const q =
    'UPDATE books SET `title`=?, `desc`= ?, `price`= ?, `cover`=? WHERE id= ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, book_id], (error, data) => {
    if (error) return res.json(error);
    return res.json('Book has been updated successfully');
  });
});

app.listen(8800, () => {
  console.log('Connect to backend !!!!');
});
