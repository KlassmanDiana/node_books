const express = require('express');
var bodyParser = require('body-parser');

const { books } = require('./DB');
const Book  = require('./Book.js');

const app = express();

app.use(bodyParser.text({type: '*/*'}));

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Not found");
    }
});

app.post('/api/books', (req, res) => {
    const body = JSON.parse(req.body);
    const newBookData = body.newBookData;

    const newBook = new Book(newBookData);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const body = JSON.parse(req.body);
    const newBookData = body.newBookData;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = newBookData;
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Not found");
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("OK, book is deleted");
    } else {
        res.status(404);
        res.json("Not found");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});