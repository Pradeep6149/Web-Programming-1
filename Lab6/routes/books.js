const express = require('express');
const router = express.Router();
const data = require('../data');
const booksData = data.books;

function errorCheckString(val, name){
    if(!val)    throw new Error(`${name} must be provided`);
    if(typeof val !== 'string')    throw new Error(`${name} must be in string`);
    if(val.trim() === '')   throw new Error(`${name} should not be empty`);
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

router.get('/', async (req, res) => {
    try {
        let allBooks = await booksData.getAllBooks();
        res.status(200).json(allBooks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let bookInfo = req.body;
    if (!bookInfo) {
        res.status(400).json({ error: 'You must provide data to create a book' });
        return;
    }
    if(Object.keys(bookInfo).length !== 5){
        res.status(400).json({ error: 'You must provide title, author, genre, datePublished and summary to create a book' });
        return;
    }
    try {
        errorCheckString(bookInfo.title, "Title")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    if(typeof bookInfo.author !== 'object' || Array.isArray(bookInfo.author)){
        res.status(400).json({ error: 'Author must be an object' });
        return;
    }
    if(Object.keys(bookInfo.author).length !== 2){
        res.status(400).json({error: 'Author must be have first name and last name'});
        return;
    }
    try {
        errorCheckString(bookInfo.author.authorFirstName, "Author's first name")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    try {
        errorCheckString(bookInfo.author.authorLastName, "Author's last name")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    if (!bookInfo.genre) {
        res.status(400).json({ error: 'You must provide genre to create a book' });
        return;
    }
    if(typeof bookInfo.genre !== 'object' || !Array.isArray(bookInfo.genre)){
        res.status(400).json({ error: 'Genre must be array of strings' });
        return;
    }
    if(bookInfo.genre.length === 0){
        res.status(400).json({ error: 'Genre array should not be empty' });
        return;
    }
    for(let val of bookInfo.genre){
        try {
            errorCheckString(val, "Values in Genre")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        }
    }
    const set = new Set();
    for(let val of bookInfo.genre) set.add(val);
    let genre_array = Array.from(set);
    bookInfo.datePublished = bookInfo.datePublished.trim();
    try {
        errorCheckString(bookInfo.datePublished, "Date Published")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
    try {
        errorCheckDate(bookInfo.datePublished)
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
    try {
        errorCheckString(bookInfo.summary, "Summary")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }

    try {
        
        const newBook = await booksData.addBook(
            bookInfo.title,
            bookInfo.author,
            genre_array,
            bookInfo.datePublished,
            bookInfo.summary
        );
        res.status(200).json(newBook);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        errorCheckString(req.params.id, "ID");
     }catch(e){
        res.status(400).json(e.message);
        return;
     } 
    try {
        let book = await booksData.getBooksbyID(req.params.id);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
});

router.put('/:id', async (req, res) => {
    let bookInfo = req.body;
    try {
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
    if (!bookInfo) {
        res.status(400).json({ error: 'You must provide data to create a book' });
        return;
    }
    if(Object.keys(bookInfo).length !== 5){
        res.status(400).json({ error: 'You must provide title, author, genre, datePublished and summary to create a book' });
        return;
    }
    try {
        errorCheckString(bookInfo.title, "Title")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    if(typeof bookInfo.author !== 'object' || Array.isArray(bookInfo.author)){
        res.status(400).json({ error: 'Author must be an object' });
        return;
    }
    if(Object.keys(bookInfo.author).length !== 2){
        res.status(400).json({error: 'Author must be have first name and last name'});
        return;
    }
    try {
        errorCheckString(bookInfo.author.authorFirstName, "Author's first name")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    try {
        errorCheckString(bookInfo.author.authorLastName, "Author's last name")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    } 
    if (!bookInfo.genre) {
        res.status(400).json({ error: 'You must provide genre to create a book' });
        return;
    }
    if(typeof bookInfo.genre !== 'object' || !Array.isArray(bookInfo.genre)){
        res.status(400).json({ error: 'Genre must be array of strings' });
        return;
    }
    if(bookInfo.genre.length === 0){
        res.status(400).json({ error: 'Genre array should not be empty' });
        return;
    }
    for(let val of bookInfo.genre){
        try {
            errorCheckString(val, "Values in Genre")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        }
    }
    const set = new Set();
    for(let val of bookInfo.genre) set.add(val);
    bookInfo.genre = Array.from(set);
    bookInfo.datePublished = bookInfo.datePublished.trim();
    try {
        errorCheckString(bookInfo.datePublished, "Date Published")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
    try {
        errorCheckDate(bookInfo.datePublished)
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }
    try {
        errorCheckString(bookInfo.summary, "Summary")
    }catch(e) {
        res.status(400).json(e.message);
        return;
    }


    try {
        const updatedBook = await booksData.updateBook(req.params.id, bookInfo);
        res.status(200).json(updatedBook);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});

router.patch('/:id', async (req, res) => {
    const requestBody = req.body;
    try {
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
    if(Object.keys(requestBody).length < 1) {
        res.status(400).json({ error: 'provide atleast one field to update' });
        return;
    }
    let updatedObject = {};
    if(requestBody.title){
        try {
            errorCheckString(requestBody.title, "Title")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        } 
    }
    if(requestBody.author){
        if(typeof requestBody.author !== 'object' || Array.isArray(requestBody.author)){
            res.status(400).json({ error: 'Author must be an object' });
            return;
        }
        if(Object.keys(requestBody.author).length !== 2){
            res.status(400).json({error: 'Author must be have first name and last name'});
            return;
        }
        try {
            errorCheckString(requestBody.author.authorFirstName, "Author's first name")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        } 
        try {
            errorCheckString(requestBody.author.authorLastName, "Author's last name")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        } 
    }
    if(requestBody.genre){
        if(typeof requestBody.genre !== 'object' || !Array.isArray(requestBody.genre)){
            res.status(400).json({ error: 'Genre must be array of strings' });
            return;
        }
        if(requestBody.genre.length === 0){
            res.status(400).json({ error: 'Genre array should not be empty' });
            return;
        }
        for(let val of requestBody.genre){
            try {
                errorCheckString(val, "Values in Genre")
            }catch(e) {
                res.status(400).json(e.message);
                return;
            }
        }
    }
    if(requestBody.datePublished){
        requestBody.datePublished = requestBody.datePublished.trim()
        try {
            errorCheckString(requestBody.datePublished, "Date Published")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        }
        try {
            errorCheckDate(requestBody.datePublished)
        }catch(e) {
            res.status(400).json(e.message);
            return;
        }
    }
    if(requestBody.summary){
        try {
            errorCheckString(requestBody.summary, "Summary")
        }catch(e) {
            res.status(400).json(e.message);
            return;
        }
    }
    
    try {
        const oldBook = await booksData.getBooksbyID(req.params.id);
        if (requestBody.title && requestBody.title !== oldBook.title)
            updatedObject.title = requestBody.title;
        if (requestBody.author && requestBody.author.authorFirstName !== oldBook.author.authorFirstName) 
            updatedObject.author = requestBody.author;
        if (requestBody.author && requestBody.author.authorLastName !== oldBook.author.authorLastName)
            updatedObject.author = requestBody.author;
        if (requestBody.genre){
            let flag = false
            const set = new Set();
            for(let val of oldBook.genre) set.add(val);
            for(let val of requestBody.genre) {
                if(!set.has(val)) flag = true
            }
            if(flag === true){
                for(let val of requestBody.genre) set.add(val);
                updatedObject.genre = Array.from(set);
            }   
        }
        if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished)
            updatedObject.datePublished = requestBody.datePublished;
        if (requestBody.summary && requestBody.summary !== oldBook.summary)
            updatedObject.summary = requestBody.summary;
    } catch (e) {
      res.status(404).json({ error: e.message });
      return;
    }
    if (Object.keys(updatedObject).length !== 0) {
      try {
        const updatedPost = await booksData.updateBookPatch(
          req.params.id,
          updatedObject
        );
        res.status(200).json(updatedPost);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    } else {
      res.status(400).json({ error: 'No fields have been changed from their inital values, so no update has occurred' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        errorCheckString(req.params.id, "ID");
    }catch(e){
        res.status(400).json(e.message);
        return;
    } 
    try {
        await booksData.getBooksbyID(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e.message });
        return;
    }
    try {
        const result = await booksData.removeBook(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error : e.message});
    }
});

module.exports = router;