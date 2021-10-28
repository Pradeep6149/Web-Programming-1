const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('mongodb');
const books = mongoCollections.books;

function errorCheckString(val, name){
    if(!val) throw new Error( `${name} must be provided`);
    if(typeof val !== 'string') throw new Error(`${name} must be string`);
    if(val.trim() === '') throw new Error(`${name} should not be empty`);
}

function errorCheckDate(date){
    let test_regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(!test_regex.test(date)) throw new Error ('Date must be in mm/dd/yyyy');
    let split_date   = date.split("/");
    let mm = parseInt(split_date[0], 10);
    let dd = parseInt(split_date[1], 10);
    let yyyy = parseInt(split_date[2], 10);
    if(yyyy < 0000 || mm == 0 || mm > 12) throw new Error ('Date Published must be a valid date');
    let days_in_month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if(yyyy % 400 == 0 || (yyyy % 100 != 0 && yyyy % 4 == 0)) days_in_month[1] = 29;
    if(dd <= 0 || dd > days_in_month[mm - 1]) throw new Error ('Date Published must be a valid date');
}

const exportedMethods = {
    async getAllBooks() {
        const booksCollection = await books();
        const bookList = await booksCollection.find({},{ projection: { _id: 1, title: 1}}).toArray();
        if (!bookList) throw new Error('No books in system!');
        for(let val of bookList) val._id = val._id.toString();
        return bookList;
    },

    async addBook(title, author, genre, datePublished, summary) {
        errorCheckString(title, 'Title');
        if (!author) throw new Error('Author must be provided');
        if (typeof author !== 'object') throw new Error('Author must be object');
        if (Array.isArray(author)) throw new Error('Author must be object');
        errorCheckString(author.authorFirstName, "Author first name")
        errorCheckString(author.authorLastName, "Author last name")
        if(!genre) throw new Error('Genre must be provided')
        if(typeof genre !== 'object' ||!Array.isArray(genre)) throw new Error('Genre must be array of strings');
        if(genre.length === 0) throw new Error('Genre should not be empty');
        for(let val of genre){
            errorCheckString(val, "Values in Genre");
        }
        if(!datePublished) throw new Error('Date musts be provided');
        errorCheckString(datePublished, "Date published");
        errorCheckDate(datePublished);
        errorCheckString(summary, "Summary");
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: []
        }
        const booksCollection = await books();      
        const newInsertInformation = await booksCollection.insertOne(newBook);
        const newId = newInsertInformation.insertedId;
        const result = await this.getBooksbyID(newId.toString())
        return result;
    },

    async addBookbyID(ID, title, author, genre, datePublished, summary) {
        errorCheckString(ID,"ID");
        errorCheckString(title, 'Title');
        if (!author) throw new Error('Author must be provided');
        if (typeof author !== 'object') throw new Error('Author must be object');
        if (Array.isArray(author)) throw new Error('Author must be object');
        errorCheckString(author.authorFirstName, "Author first name")
        errorCheckString(author.authorLastName, "Author last name")
        if(!genre) throw new Error('Genre must be provided')
        if(typeof genre !== 'object' ||!Array.isArray(genre)) throw new Error('Genre must be array of strings');
        if(genre.length === 0) throw new Error('Genre should not be empty');
        for(let val of genre){
            errorCheckString(val, "Values in Genre");
        }
        if(!datePublished) throw new Error('Date musts be provided');
        errorCheckString(datePublished, "Date published");
        datePublished = datePublished.trim();
        errorCheckDate(datePublished);
        errorCheckString(summary, "Summary");
        const booksCollection = await books();
        const book_review = await booksCollection.findOne({ _id: ObjectID(id)}, { projection: { _id: 0, reviews: 1} });
		let get_review = book_review.reviews; 
        for(let val of get_review) val._id = val._id.toString();
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: get_review
        }      
        const updateInfo = await booksCollection.updateOne(
            { _id: ObjectID(ID) },
            { $set: newBook }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw new Error('Update failed');
        const result = await this.getBooksbyID(ID)
        return result;
    },

    async updateBook(id, updatedUser) {
        errorCheckString(id, "ID");
        const oldbook = await this.getBooksbyID(id); 
        let updatedObject = {};
        if (updatedUser.title && updatedUser.title !== oldbook.title)
            updatedObject.title = updatedUser.title;
        if (updatedUser.author && updatedUser.author.authorFirstName !== oldbook.author.authorFirstName)
            updatedObject.author = updatedUser.author;
        if (updatedUser.author && updatedUser.author.authorLastName !== oldbook.author.authorLastName)
            updatedObject.author = updatedUser.author;
        if (updatedUser.genre){
            const set = new Set();
            const set_new = new Set();
            for(let val of oldbook.genre) set.add(val);
            for(let val of updatedUser.genre) set_new.add(val);
            let old_genre = Array.from(set);
            let update_genre = Array.from(set_new);
            old_genre = old_genre.sort();
            update_genre = update_genre.sort();
            if(JSON.stringify(old_genre) !== JSON.stringify(update_genre)){
                updatedObject.genre = Array.from(set_new);
            }
        }
        if (updatedUser.datePublished && updatedUser.datePublished !== oldbook.datePublished)
            updatedObject.datePublished = updatedUser.datePublished;
        if (updatedUser.summary && updatedUser.summary !== oldbook.summary)
            updatedObject.summary = updatedUser.summary;
        if (Object.keys(updatedObject).length === 0) throw new Error ('No fields have been changed from their inital values, so no update has occurred')
        let bookUpdateInfo = {
            title: updatedUser.title,
            author: updatedUser.author,
            genre: updatedUser.genre,
            datePublished: updatedUser.datePublished,
            summary: updatedUser.summary,
            reviews: oldbook.reviews 
        };
        const booksCollection = await books();
        const updateInfo = await booksCollection.updateOne(
            { _id: ObjectID(id) },
            { $set: bookUpdateInfo }
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw new Error('Update failed');
        return await this.getBooksbyID(id);
    },

    async getBooksbyID(id) {
        errorCheckString(id, "ID")
        const booksCollection = await books();
        const book = await booksCollection.findOne({ _id: ObjectID(id) });
        if (book === null) throw new Error(`No book with the id ${id}`);
        book._id = book._id.toString();
        return book;
    },

    async updateBookPatch(id, updatedBook) {
        errorCheckString(id, "ID");
        const booksCollection = await books();
        const updatedBookData = {};
        if (updatedBook.title) updatedBookData.title = updatedBook.title;
        if (updatedBook.author) updatedBookData.author = updatedBook.author;
        if (updatedBook.genre) updatedBookData.genre = updatedBook.genre;
        if (updatedBook.datePublished) updatedBookData.datePublished = updatedBook.datePublished;
        if (updatedBook.summary) updatedBookData.summary = updatedBook.summary;
        await booksCollection.updateOne({ _id: ObjectID(id) }, { $set: updatedBookData });
        return await this.getBooksbyID(id);
    },

    async removeBook(id) {
        errorCheckString(id, "ID");
        const booksCollection = await books();
        const deletionInfo = await booksCollection.removeOne({ _id: ObjectID(id) });
        if (deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete book with id of ${id}`);
        }
        let result = {
            bookId : id,
            deleted : true
        }
        return result;
    },
};

module.exports = exportedMethods;