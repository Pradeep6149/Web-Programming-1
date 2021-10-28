const express = require('express');
const router = express.Router();
const { default: axios } = require("axios")

router.get('/', async (req, res) => {
	try {
		res.render('shows/formfinder', { currentTitle : "Show Finder", currentHeader : "Show Finder"  });
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/search', async (req, res) => {
    let formData = req.body;
    let errors = [];

    if (!formData.searchTerm || formData.searchTerm.trim()==="") {
        errors.push("Please enter a keyword");
    }

    if (errors.length > 0) {
        
        res.status(400).render('shows/errorFile', {
			errorDetails: errors,
			currentTitle : "Error", currentHeader : "Error"
        });
        return;
    }

    try {
		const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${formData.searchTerm}`);
		let showData;
		if(data.length == 0){
			res.render('shows/showNotFound', { 
				currentTitle : "Show Not Found",
				currentHeader : "Show Not Found",
				searchTerm : formData.searchTerm 
				});
				return;
		} 
	
		if(data.length > 20) showData = data.slice(0,20);
		else showData = data
		res.render('shows/showDetails', { 
			showsMatched: showData, 
			currentTitle : "Shows Found",
			currentHeader : "Shows Found",
			searchTerm : formData.searchTerm 
		});
    } catch (e) {
      res.status(500).send();
    }
});

router.get('/shows/:id', async (req, res) => {
	let show_id = req.params.id;
	let consonant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 
	vowel = ['a','e','i','o','u','A','E','I','O','U'],
	punct = ['\'', ':', ',','-', '...', '!', '(', ')', '[', ']', '{', '}', '.', '?', '\"', ';', '.'], 
	specialCharacter = ['#', '$', '%', '&', '^', '@', '*' , '`', '+', '/', '<', '>', '~', '\\', '|' ] ;
	for(let i of show_id){
	  if(punct.includes(i) || specialCharacter.includes(i) || consonant.includes(i) || vowel.includes(i)){
		res.status(404).render('shows/errorFile', {
			errorDetails: `We're sorry, but no results were found for id ${show_id}`,
			currentTitle : "No Show Found", currentHeader : "No Show Found"
        });
        return;
	  }
	}
	show_id = parseInt(req.params.id); 
	if(isNaN(show_id) || show_id < 0) {
		res.status(404).render('shows/errorFile', {
			errorDetails: `We're sorry, please give a valid ID`,
			currentTitle : "No Show Found", currentHeader : "No Show Found"
        });
        return;
	}
  try {
    let { data } = await axios.get(`http://api.tvmaze.com/shows/${show_id}`);
	if(!data){
		res.status(404).render('shows/errorFile', {
			errorDetails: `We're sorry, but no results were found for id ${show_id}`,
			currentTitle : "No Show Found", currentHeader : "No Show Found"
        });
        return;
	}  
	let hasGenre = true, hasAverage = true, hasImage = true, hasLanguage = true, hasSummary = true, hasNetwork= true;
	if(data.genres.length == 0) hasGenre = false;
	if(!data.language) hasLanguage = false;
	if(!data.image || !data.image.medium) hasImage = false;
	if(!data.rating || !data.rating.average) hasAverage = false;
	if(!data.summary) hasSummary = false;
	if(!data.network || !data.network.name) hasNetwork = false;
    res.render('shows/id', { 
        showsMatched: data, 
        currentTitle : data.name,
		hasGenre : hasGenre,
		hasAverage : hasAverage,
		hasImage : hasImage,
		hasLanguage : hasLanguage,
		hasSummary : hasSummary,
		hasNetwork : hasNetwork
      });
  } catch (e) {
    res.status(404).render('shows/errorFile', {
		errorDetails: `We're sorry, please give a valid ID`,
		currentTitle : "No Show Found", currentHeader : "No Show Found"
	});
	return;
  }
});

module.exports = router;