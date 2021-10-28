// let a = 10.0
// let test = "I'm from India and I'm a master's student in Stevens. I live in Jersey City, New Jersey. I did my Undergrad in Information Technology and have 1 year of experience as a software developer in Tata Consultancy Services. \nI'm a Gamer and I play Fortnite and Valorant. I'm also into basketball and Lakers is my All-time favorite team where legends like Kobe, Shaq and Lebron had played."
// console.log(test)
// b = Math.floor(a)
// console.log(b) 
// console.log(a)
// console.log(typeof a)
// console.log(typeof b)
// if(a === b) console.log(true)
// if(parseInt(a)) console.log('number');
// else console.log("String")
const PlayerOne = ['B', 'C', 'A', 'D'];
const PlayerTwo = ['D', 'C'];

const result = PlayerOne.every(val => PlayerTwo.includes(val));

console.log(result);