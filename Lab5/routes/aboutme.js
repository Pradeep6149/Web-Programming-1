const express = require('express');
const router = express.Router();
const { default: axios } = require("axios")

router.get('/', async (req, res) => {
    try {
      const details = {
        name : "Pradeep Kumar Senthamarai Kannabiran",
        cwid : "10468251",
        biography : "I'm from India and I'm a master's student in Stevens. I live in Jersey City, New Jersey. I did my Undergrad in Information Technology and have 1 year of experience as a software developer in Tata Consultancy Services. \nI'm a Gamer and I play Fortnite and Valorant. I'm also into basketball and Lakers is my All-time favorite team where legends like Kobe, Shaq and Lebron had played.",
        favoriteShows : ["FRIENDS", "Game of Thrones", "The IT Guys", "The Queen's Gambit"]
      }
      res.json(details);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  
module.exports = router;