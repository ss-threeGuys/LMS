const mongoose = require('mongoose');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

function findAllBooks() {
    return Book.find();
}

function checkBookAuthors(book) {
    return Promise.all(book.authors.map(id => Author.exists({ "_id": id })));
}
function checkBookGenres(book) {
    return Promise.all(book.genres.map(id => Genre.exists({ "_id": id })));
}

//to-do: check book publisher

function createBook(book) {
    if (!book.authors) {
        book.authors = [];
    }

    if (!book.genres) {
        book.genres = [];
    }


    return checkBookAuthors(book)
        .then(authors => {
            book.authors = book.authors.filter((author, index) => authors[index]);
            return checkBookGenres(book)
                .then(genres => {
                    book.genres = book.genres.filter((genre, index) => genres[index]);
                    
                    //to-do: check publisher
                    
                    return Book.create(book)
                })
                .then(book => {
                    return book;
                })
                .catch(err => console.error(err))
        })
}




function updateBook(book) {
    return checkBookAuthors(book)
        .then(authors => {
            book.authors = book.authors.filter((author, index) => authors[index]);
            return checkBookGenres(book)
                .then(genres => {
                    book.genres = book.genres.filter((genre, index) => genres[index]);
                    
                    // to do: check publisher and update publisher
                    return Book.findByIdAndUpdate(book._id, { new: true }, { title: book.title }, { author: book.authors }, { genres: book.genres });
                }).catch(err => console.error(err))
        })
}

function deleteBook(id) {
    return Book.findByIdAndDelete({ "_id": id });
}

module.exports = { findAllBooks, createBook, updateBook, deleteBook };