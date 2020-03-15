const mongoose = require('mongoose')
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const Publisher = require('../models/Publisher')

function findAllBooks() {
    return Book.find()
    .populate('authors')
    .populate('genres')
    .populate('publisher');
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

    return mongoose.startSession()
        .then(_session => {
            session = _session;
            session.startTransaction();
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
                .then(book => {
                    session.commitTransaction();
                    return book.populate('authors').populate('genres').populate('publisher').execPopulate();
                })
                .catch(err => {
                    session.abortTransaction();
                    throw err;
                })
        })
}

function updateBook(book) {
    if (!book.authors) {
        book.authors = [];
    }

    if (!book.genres) {
        book.genres = [];
    }

    return mongoose.startSession()
        .then(_session => {
            session = _session;
            session.startTransaction();
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

                    return Book.findByIdAndUpdate(book._id, { title: book.title, authors: book.authors, genres: book.genres, publisher: book.publisher })
                })
                .then(() => {
                    session.commitTransaction();
                })
                .catch(err => {
                    session.abortTransaction();
                    throw err;
                });
        })
}

function deleteBook(id) {
    return Book.findByIdAndDelete({ "_id": id });
}

module.exports = { findAllBooks, createBook, updateBook, deleteBook };