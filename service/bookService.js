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
                    return Book.create(book)
                })
                .then(book => {

                    updateAuthorsAndGenres(book);
                    return book;
                })
                .catch(err => console.error(err))
        })
}

function updateAuthorsAndGenres(book) {
   
    let bookId = book._id;
    if (book.authors.length) {
        book.authors.forEach(author => {

            Author.findByIdAndUpdate(author, { $push: { books: bookId } }, { new: true })
                .then(author => console.log(author));
        })
    }
    if (book.genres.length) {
        book.genres.forEach(genre => {
            Genre.findByIdAndUpdate(genre, { $push: { books: bookId } })
        })
    }
}


function updateBook(book) {
    return checkBookAuthors(book)
        .then(authors => {
            book.authors = book.authors.filter((author, index) => authors[index]);
            return checkBookGenres(book)
                .then(genres => {
                    book.genres = book.genres.filter((genre, index) => genres[index]);
                    return Book.findByIdAndUpdate(book._id, { new: true }, { title: book.title }, { author: book.authors }, { genres: book.genres });
                })
                .then(book => updateAuthorsAndGenres(book)
                ).catch(err => console.error(err))
        })
}

function deleteBook(id) {
    return Book.findById(id)
        .then(book => {
            let bookAuthors = book.authors;
            let bookGenres = book.genres;
            let id = book._id
            Book.findByIdAndDelete({ "_id": id })
                .then(() => {

                    return Promise.resolve({ id, bookAuthors, bookGenres });
                })
                .then(() => {

                    deleteBookFromAuthors(id, bookAuthors)
                    deleteBookFromGenres(id, bookGenres)
                })


        })

}

function deleteBookFromAuthors(bookId, authors) {
    authors.forEach(author => {
        Author.findByIdAndUpdate(author, { $pull: { books: bookId } }, { new: true })
            .then(author => console.log(author));
    })
}

function deleteBookFromGenres(bookId, genres) {
    genres.forEach(genre => {
        Genre.findByIdAndUpdate(genre, { $pull: { books: bookId } })
    })
}



module.exports = { findAllBooks, createBook, updateBook, deleteBook };