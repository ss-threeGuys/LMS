const mongoose = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book')

function findAllAuthors() {
    return Author.find();
}

function createAuthor(author) {
    return Author.create(author)
}

function updateAuthor(author) {
    return Author.findByIdAndUpdate(author._id, { name: author.name })
}

const deleteAuthor = async (id) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try {
        await Book.updateMany({ authors: id }, { $pull: { authors: id } })
        await Author.findByIdAndDelete(id);
        await session.commitTransaction();
            
    } catch (err) {
        await session.abortTransaction();
        throw err
    } finally {
        session.endSession();
    }
}

module.exports = { findAllAuthors, createAuthor, updateAuthor, deleteAuthor };