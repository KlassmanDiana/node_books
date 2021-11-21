class Book {
    constructor(book) {
        this.id = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
        this.title = book.title;
        this.description = book.description;
        this.authors = book.authors,
        this.favorite = book.favorite,
        this.fileCover = book.fileCover,
        this.fileName = book.fileName
    }
}

module.exports = Book;