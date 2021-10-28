const lab1 = require("./lab1");


console.log("***************** Question One *****************")

console.log(lab1.questionOne([2, 13, 45, 9])); 
//returns and outputs: { '2':true, '13': true, '45': false}

console.log(lab1.questionOne([1, 0, -1])); 
//returns and outputs: { '1': false, '0': false, '-1': false }

console.log(lab1.questionOne([15, 11, 89])); 
//returns and outputs: { '15': false, '11': true, '89': true }

console.log(lab1.questionOne([3, 97, 111, 137])); 
//returns and outputs: { '3': true, '97': true, '111': false, '137': true }

console.log(lab1.questionOne([23, 67, 100])); 
//returns and outputs: { '23': true, '67': true, '100': false }

console.log(lab1.questionOne([])); 
//returns and outputs: {}

console.log(lab1.questionOne()); 
//returns and outputs: {}

console.log("***************** Question Two *****************")

console.log(lab1.questionTwo([2, 8, 7])); 
// returns and outputs: 148069.17

console.log(lab1.questionTwo([11, 20, 1])); 
// returns and outputs: 6225528.96

console.log(lab1.questionTwo([0, -5, 10])); 
// returns and outputs: 174692.81 

console.log(lab1.questionTwo([70])); 
//  returns and outputs: 1680700000

console.log(lab1.questionTwo([3, 6, 9])); 
//  returns and outputs: 178207.66

console.log(lab1.questionTwo([])); 
//returns and outputs: 0

console.log(lab1.questionTwo()); 
//returns and outputs: 0

console.log("***************** Question Three *****************")

console.log(lab1.questionThree("This is my first year in Stevens Institute of Technology!")); 
// returns and outputs: {consonants: 31, vowels: 16, numbers: 0, spaces: 9, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("Can I call you?"));
// returns and outputs: {consonants: 6, vowels: 5, numbers: 0, spaces: 3, punctuation: 1, specialCharacters: 0}


console.log(lab1.questionThree("\"A, E, I, O, U\" - these 5 are vowels."));
//  returns and outputs: {consonants: 8, vowels: 11, numbers: 1, spaces: 9, punctuation: 8, specialCharacters: 0}


console.log(lab1.questionThree("NYC is one of the great cities & have many skyscrapers!!!")); 
// returns and outputs: {consonants: 28, vowels: 15, numbers: 0, spaces: 10, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("201-936-1234 is my contact number.")); 
// returns and outputs: {consonants: 12, vowels: 5, numbers: 10, spaces: 4, punctuation: 3, specialCharacters: 0}


console.log(lab1.questionThree("")); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree()); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log("***************** Question Four *****************")

console.log(lab1.questionFour(15000, 4, 3)); 
//returns and outputs: 422.86

console.log(lab1.questionFour(56000, 8, 5)); 
//returns and outputs: 1135.48

console.log(lab1.questionFour(10000, 5, 1)); 
//returns and outputs: 856.07

console.log(lab1.questionFour(60000, 6, 10)); 
//returns and outputs: 666.12   

console.log(lab1.questionFour(5000, 3.5, 2)); 
//returns and outputs: 216.01

console.log(lab1.questionFour(12000, 1, 1)); 
//returns and outputs: 1005.42
