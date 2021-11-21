const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../book_service/middleware/file.js');

const { books } = require('../../DB.js');
const Book  = require('../../Book.js');

// получение всех книг
router.get('/', (req, res) => {
    res.json(books);
});

// получение книги по id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("Not found");
    }
});

// создать книгу
router.post('/', (req, res) => {
    const newBookData = req.body.newBookData;

    const newBook = new Book(newBookData);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

// обновить книгу
router.put('/:id', (req, res) => {
    const newBookData = req.body.newBookData;
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

// удалить книгу
router.delete('/:id', (req, res) => {
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

// загрузить изображение
router.post('/:id/upload-img', fileMiddleware.single('book-img'), (req, res) => {
    if (req.file) {
        console.log("file exist");
        const {path} = req.file;
        console.log(path);

        const {id} = req.params;
        const idx = books.findIndex(el => el.id === id);
        if (idx !== -1) {
            books[idx].imgBook = path;
            res.status(201);
            res.json(books[idx]);
        } else {
            res.status(404);
            res.json(`Book with id = ${id} is not exist. First create a book.`);
        }
    } else {
        res.status(404);
        res.json("File is not defined");
    }
});

// скачать изображение
router.get('/:id/download-img', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    const path = books[idx].imgBook;
    console.log(id, idx);
    if (idx !== -1 && path) {
        res.download(__dirname + `/../${path}`, 'imgBoook.jpeg', err=>{
            if (err){
                res.status(404);
                res.json("Error download");
            }
        });
    } else {
        res.status(404);
        res.json("Error");
    }
});

// загрузить пдф
router.post('/:id/upload-pdf', fileMiddleware.single('book-pdf'), (req, res) => {
    if (req.file) {
        console.log("file exist");
        const {path} = req.file;
        console.log(path);

        const {id} = req.params;
        const idx = books.findIndex(el => el.id === id);
        if (idx !== -1) {
            books[idx].fileBook = path;
            res.status(201);
            res.json(books[idx]);
        } else {
            res.status(404);
            res.json(`Book with id = ${id} is not exist. First create a book.`);
        }
    } else {
        res.status(404);
        res.json("File is not defined");
    }
});

// скачать пдф
router.get('/:id/download-pdf', (req, res) => {
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    const path = books[idx].fileBook;
    console.log(id, idx);
    if (idx !== -1 && path) {
        res.download(__dirname + `/../${path}`, 'pdfBook.pdf', err=>{
            if (err){
                res.status(404);
                res.json("Error download");
            }
        });
    } else {
        res.status(404);
        res.json("Error");
    }
});

module.exports = router;