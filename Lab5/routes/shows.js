const express = require('express');
const router = express.Router();
const { default: axios } = require("axios")


router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    res.json(data);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  let show_id = req.params.id;
  let consonant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 
  vowel = ['a','e','i','o','u','A','E','I','O','U'],
  punct = ['\'', ':', ',','-', '...', '!', '(', ')', '[', ']', '{', '}', '.', '?', '\"', ';', '.'], 
  specialCharacter = ['#', '$', '%', '&', '^', '@', '*' , '`', '+', '/', '<', '>', '~', '\\', '|' ] ;
  for(let i of show_id){
    if(punct.includes(i) || specialCharacter.includes(i) || consonant.includes(i) || vowel.includes(i)){
      res.status(400).json({ message : "ID must be a positive whole number"});
      return;
    }
  }
  show_id = parseInt(req.params.id); 
  if(isNaN(show_id) || show_id < 0) {
    res.status(400).json({ message : "ID must be a positive whole number"});
    return;
  }
  try {
    let { data } = await axios.get(`http://api.tvmaze.com/shows/${show_id}`); 
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "ID not FOUND" });
  }
});

module.exports = router;