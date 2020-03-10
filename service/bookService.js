
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const Publisher = require('../models/Publisher')

function findAllBooks() {
    return Book.find();
}

function checkBookAuthors(book) {
    if (book.authors) {
        return Promise.all(book.authors.map(id => Author.exists({ "_id": id })));
    } else {
        return [];
    }
    
}

function checkBookGenres(book) {
    if (book.genres) {
        return Promise.all(book.genres.map(id => Genre.exists({ "_id": id })));
    } else {
        return []
    }
}

function checkPublisher(book) {
    if (book.publisher) {
        return Promise.all(Publisher.exists({ "_id": book.publisher }));
    } else {
        return null;
    }
}

function createBook(book) {
    if (!book.authors) {
        book.authors = [];
    }

    if (!book.genres) {
        book.genres = [];
    }
    
    return checkBookAuthors(book)
        .then(authors => {
            if (authors.length) {
                book.authors = book.authors.filter((author, index) => authors[index]);
            }
            return checkBookGenres(book)
        })
        .then(genres => {
            if (genres.length) {
                book.genres = book.genres.filter((genre, index) => genres[index]);
            }

            return checkPublisher(book)
        })
        .then(publisherExists => {
            if (!publisherExists) {
                book.publisher = null;
            }
            return Book.create(book)
        })
        .then(book => book)
        .catch(err => console.error(err))
}

function updateBook(book) {
    if (!book.authors) {
        book.authors = [];
    }

    if (!book.genres) {
        book.genres = [];
    }
    
    return checkBookAuthors(book)
        .then(authors => {
            if (authors.length) {
                book.authors = book.authors.filter((author, index) => authors[index]);
            }

            return checkBookGenres(book)
        })
        .then(genres => {
            if (genres.length) {
                book.genres = book.genres.filter((genre, index) => genres[index]);
            }
            return checkPublisher(book)
        })
        .then(publisherExists => {
            if (!publisherExists) {
                book.publisher = null;
            }
            console.log("in checkpublisher callback" + JSON.stringify(book));
            return Book.findByIdAndUpdate(book._id, { title: book.title, authors: book.authors, genres: book.genres, publisher: book.publisher })
        })
        .catch(err => console.error(err))
}

function deleteBook(id) {
    return Book.findByIdAndDelete({ "_id": id });
}

module.exports = { findAllBooks, createBook, updateBook, deleteBook };