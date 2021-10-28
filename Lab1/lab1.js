const questionOne = function questionOne(arr) {
    let result = {
    };
    if(arr == null || arr.length === 0) return result;    // null handling and checking for empty array
    for(let i = 0; i < arr.length ;  i++){
        let flag = true;
        if(arr[i] <= 1)   flag = false;
        else{
            for(let j = 2; j <= Math.sqrt(arr[i]) ; j++){     
                if(arr[i]%j === 0){                     // Checking whether the given number is divisible by 2 to square root of the same number 
                    flag = false;
                    break;   
                }
            }
        }
        let temp = arr[i];
        if(flag === true) result[arr[i]] = true;      // Storing whether prime or not for the respective values  
        else result[arr[i]] = false;
    }
    return result;
}

const questionTwo = function questionTwo(arr) { 
    if(arr == null || arr.length === 0) return 0;   // null handling and checking for empty array
    let sum = 0;
    for( let i=0 ; i < arr.length ; i++ ){
        sum += arr[i] * arr[i];                     // adding the square of all the elements in the array
    }
    return parseFloat(Math.sqrt(Math.pow(sum,5)).toFixed(2));           // returning the rounded final value
    
}

const questionThree = function questionThree(text) {
    let result = {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}
    if(text == null || text == '') return result; // null handling and checking for empty string
    let consonant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 
    vowel = ['a','e','i','o','u','A','E','I','O','U'], 
    number = ['0','1','2','3','4','5','6','7','8','9'],
    punct = ['\'', ':', ',','-', '...', '!', '(', ')', '[', ']', '{', '}', '.', '?', '\"', ';'], 
    specialCharacter = ['#', '$', '%', '&', '^', '@', '*' , '`', '+', '/', '<', '>', '~', '\\', '|' ] ;
    for ( let i of text){           // traversing through the given string to find the count of consonants, vowels, numbers, spaces, punctuations and special character and reflecting the count in result object.
        if(consonant.includes(i)) result.consonants++;          
        else if(vowel.includes(i)) result.vowels++;
        else if(number.includes(i)) result.numbers++;
        else if(i == ' ') result.spaces++;
        else if(punct.includes(i)) result.punctuation++;
        else if(specialCharacter.includes(i)) result.specialCharacters++; 
    }
    return result;
}

const questionFour = function questionFour(num1, num2, num3) {
    let i = (num2/100)/12, numberOfMonths = num3 * 12;   // assigning the interest rate of each month and number of months
    let discountFactor = (Math.pow((1 + i),numberOfMonths)-1) / (i * Math.pow((1 + i),numberOfMonths)); // finding the discountFactor  
    return parseFloat((num1/discountFactor).toFixed(2)); // returning the rounded value of monthly payment of the loan
}

module.exports = {
    firstName: "Pradeep Kumar", 
    lastName: "Senthamarai Kannbiran", 
    studentId: "10468251",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};