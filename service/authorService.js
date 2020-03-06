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
    Author.findById(id)
    .then(author=> {
        Book.find((book, {authors : authors.filter(author => author !== id)})
            .then(data => console.log(data))
        )}
    )
}

        


    
    // Author.findByIdAndDelete(id);



module.exports = { findAllAuthors, createAuthor, updateAuthor, deleteAuthor };