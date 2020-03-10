const mongoose = require('mongoose');
const Author = require('../models/Author');

function findAllAuthors() {
    return Author.find();
}

function createAuthor(author) {
    return Author.create(author)
}

function updateAuthor(author) {
    return Author.findByIdAndUpdate(author._id, {name : author.name})
}

function deleteAuthor(id) {
    //to-do : delete author from books
    //to-do : add transaction
    
    return Author.findByIdAndDelete(id);
}


module.exports = { findAllAuthors, createAuthor, updateAuthor, deleteAuthor };