const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const usersData = require('./users');
const exphbs = require('express-handlebars');
const bcrypt = require('bcryptjs');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const session = require('express-session')

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    authenticated : false
  })
);

app.use( async (req,res,next) =>{
  if(req.session.user)
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
  else
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
  next();
});


app.get('/', (req, res) => {
  if (!req.session.authenticated) {
    res.render("userDisplay/formfinder",{currentTitle : "Login", currentHeader : "Login Form", hasErrors : false});
  } else {
    res.redirect("/private");
  }
});

app.post('/login', (req,res) => {
  if(req.session.authenticated){
    res.redirect("/private");
  }
  else{
    let currentUser = checkUsernameandPassword(req.body.username, req.body.password)
    if(errorCheckString(req.body.username) && errorCheckString(req.body.password) && currentUser){
        req.session.user = currentUser; 
        req.session.authenticated = true;
        res.redirect("/private");
    }
    else{
      res.status(401);
      res.render("userDisplay/formfinder",{currentTitle : "Login", currentHeader : "Login Form", hasErrors : true});
    }
  }
});

app.get('/login', (req,res) => {
  if(req.session.authenticated){
    res.redirect("/private");
  }
  else{
    res.status(401);
      res.render("userDisplay/formfinder",{currentTitle : "Login", currentHeader : "Login Form", hasErrors : false});
  }
})

app.use('/private', (req,res,next) => {
  if(req.session.user){
    next();
  } 
  else{
    res.status(403);
    res.render('userDisplay/notLoggedin', {currentTitle : "Not logged in"});
  }
});

app.get('/private', (req,res) =>{
  if(req.session.authenticated){
    res.render("userDisplay/displayUserData", {currentTitle : "User Data", users : req.session.user})
  }
})



app.get('/logout', (req,res) =>{
    req.session.destroy();
    res.render("userDisplay/logout",{currentTitle : "Logged Out"});
});


function checkUsernameandPassword(username ,password){
  if(!username || !password) return false;
  for(let i=0; i<usersData.length; i++)
    if(username === usersData[i].username && bcrypt.compareSync(password,usersData[i].hashedPassword))  return usersData[i];
  return false;
}

function errorCheckString(val){
	if(!val)	return false;
	if(val.trim() === '')	return false;
  return true;
}



app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});