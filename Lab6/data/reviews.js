const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('mongodb');
const books = mongoCollections.books;
const booksData = require('./books');

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
	async getReviewforBookById(id) {
        errorCheckString(id, "ID")
        const booksCollection = await books();
        const book_review = await booksCollection.findOne({ _id: ObjectID(id)}, { projection: { _id: 0, reviews: 1} });
        if (book_review === null) throw new Error(`No review for book with the id ${id}`);
		let result = book_review.reviews; 
        for(let val of result) val._id = val._id.toString();
        return result;
    },

	async addReview(_id, title, reviewer, rating, dateOfReview, review, bookId) {
		if(!_id) throw new Error('Review ID must be given');
		errorCheckString(bookId, "Book ID")
		errorCheckString(title, "Title");
		errorCheckString(reviewer, "Reviewer");
		errorCheckString(review, "Review");
		if(!rating) throw new Error ('rating must be provided within 1 - 5');
		if (typeof rating !=='number') throw new Error ('rating must be in number');
		if( rating < 1 || rating > 5) throw new Error ('Rating must be in range 1 - 5');
		errorCheckString(dateOfReview, "Date of review");
		errorCheckDate(dateOfReview)
		// if(ObjectID.isValid(id)) {
		// 	if(((String)(new ObjectID(id))) !== id) throw new Error ('Rating must be in range 1 - 5');
		// }

		const bookCollection = await books();
		const currentReview = {
			_id : _id,
			title : title,
			reviewer : reviewer,
			rating : rating,
			dateOfReview : dateOfReview,
			review : review
		}
		const currentBook = await booksData.getBooksbyID(bookId);
		currentBook.reviews.push(currentReview);
		
		const updateInfo = await bookCollection.updateOne(
			{ _id: ObjectID(bookId) },
			{ $addToSet: { reviews: currentReview } }
		);
			
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
		  	throw new Error ('Update failed');
		const result = await booksData.getBooksbyID(bookId)
		return result;
	},

	async getReviewsbyID(id) {
		errorCheckString(id, "ID");	
		const bookCollection = await books();
		const allBooks = await booksData.getAllBooks();
		let flag = 0;
		const result = await bookCollection.find({ 'reviews._id' : ObjectID(id)}).toArray();
		let get_review = {};
		for(let currentBook of result){
		 	let currentReview = currentBook.reviews;
			for(let val of currentReview){
				if(val._id.toString() === id){
					get_review = val;
					flag = 1;
					break;
				}
			}
			if(flag === 1) break;
		}
		if(flag === 0) throw new Error ('No review found');
		return get_review;
	},

	async removeReview(id) {
		errorCheckString(id, "ID");
		const bookCollection = await books();
		const allBooks = await booksData.getAllBooks();
		let flag = 0;
		const bookValues = await bookCollection.find({ 'reviews._id' : ObjectID(id)}).toArray();
		let bookID;
		for(let currentBook of bookValues){
		 	let currentReview = currentBook.reviews;
			for(let val of currentReview){
				if(val._id.toString() === id){
					bookID = currentBook._id;
					flag = 1;
					break;
				}
			}
			if(flag === 1) break;
		}
		if(flag === 0) throw new Error ('No review found');
		const updateInfo = await bookCollection.updateOne(
			{ _id: ObjectID(bookID) },
			{ $pull: { reviews: { _id: ObjectID(id) } } }
		  );
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw new Error('Update failed');
		let result = {
			reviewId : id,
			"deleted" : true
		}
		return result;
	}

};

module.exports = exportedMethods;