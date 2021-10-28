const { ObjectID } = require('mongodb');
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;

function errorCheckString(val, name){
	if(!val)	throw new Error(`${name} must be provided`);
	if(typeof val !== 'string')		throw new Error(`${name} must be in string`);
	if(val.trim() === '')	throw new Error(`${name} should not be empty`);
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

router.get('/:id', async (req, res) => {
	try{
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
	try{
		const review = await reviewData.getReviewforBookById(req.params.id);
		res.status(200).json(review);
	} catch (e){
		res.status(404).json({ error: e.message });
	}
});

router.post('/:id', async (req, res) => {
	const bookReviewData = req.body;
	try {
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
	if (!bookReviewData) {
        res.status(400).json({ error: 'You must provide data to create a review' });
        return;
    }
    if(Object.keys(bookReviewData).length !== 5){
        res.status(400).json({ error: 'You must provide title, reviewer, rating, dateOfReview and review to create a review for book' });
        return;
    }
    try {
        errorCheckString(bookReviewData.title, "Title")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
	try {
        errorCheckString(bookReviewData.reviewer, "Reviewer")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
	if(!bookReviewData.rating){
		res.status(400).json({ error: 'You must provide rating' });
        return;
	}  
	if(typeof bookReviewData.rating !== 'number'){
		res.status(400).json({ error: 'You must provide rating in number' });
        return;
	} 
	if( bookReviewData.rating < 1 || bookReviewData.rating > 5){
		res.status(400).json({ error: 'You must provide rating between 1 to 5' });
        return;
	}
	try {
        errorCheckString(bookReviewData.dateOfReview, "Date of review")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
    try {
		bookReviewData.dateOfReview = bookReviewData.dateOfReview.trim();
        errorCheckDate(bookReviewData.dateOfReview)
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
	try {
        errorCheckString(bookReviewData.review, "Review")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
	bookReviewData._id = new ObjectID;
	bookReviewData.dateOfReview = bookReviewData.dateOfReview.trim();
	// try{
	// 	const currentBook = await bookData.getBooksbyID(req.params.id);
	// }catch (e) {
	// 	res.status(400).json({ error: e.message });
	// }
	try {
		const { title, reviewer, rating, dateOfReview, review } = bookReviewData;
		const newReview = await reviewData.addReview(bookReviewData._id, title, reviewer, rating, dateOfReview, review, req.params.id);
		res.json(newReview);
	} catch (e) {
		res.status(500).json(e.message);
	}
});

router.get('/review/:id', async (req, res) => {
	try{
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
	try{
		const result = await reviewData.getReviewsbyID(req.params.id);
		res.status(200).json(result);
	}catch(e){
		res.status(404).json(e.message);
	}
});


router.delete('/:id', async (req, res) => {
	try{
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
	try {
		await reviewData.getReviewsbyID(req.params.id);
	} catch (e) {
		res.status(404).json({ error: 'Review not found' });
		return;
	}
	try {
		const result = await reviewData.removeReview(req.params.id);
		res.status(200).json(result);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});



module.exports = router;