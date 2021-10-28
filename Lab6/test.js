const moment = require("moment");
const { ObjectID } = require('mongodb');

// let test = '10/10/2020'
// console.log(moment(test, "mm/dd/yyyy").isValid())

let test = ["pra", "ku"];
let test1 = ["ku", "pra"];
console.log(test.equ)
// const set = new Set();
//     for(let val of test1) 
//         set.add(val);
//     for(let val of test){
//         if(!set.has(val)) console.log(662)
//     }

let id = 'toptoptoptop'
if(((String)(new ObjectID(id))) === id)
    console.log(ObjectID.isValid(id));