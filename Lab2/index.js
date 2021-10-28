const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

try{
    console.log(arrayUtils.mean([3, -7, 5, 13, -2]))
    console.log('mean passed successfully');
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.mean([1,2,3,4,5,"Pradeep"]))
} catch(error){
    console.log(error);
    console.log('mean failed test case');
}


try{
    console.log(arrayUtils.medianSquared([12,5,3,4]))
    console.log('median passed successfully');
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.medianSquared([1,2,3,4,5,"Pradeep"]))
} catch(error){
    console.log(error);
    console.log('median failed test case');
}


try{
    console.log(arrayUtils.maxElement([1000, 0 ,0 , 2, 1000, 1 ,2 ,3, 4000000, 5, 10001]))
    console.log('maxElement passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.maxElement(100, 50, 40))
} catch(error){
    console.log(error);
    console.log('maxElement failed test case');
}


try{
    console.log(arrayUtils.fill(10.4, 10))
    console.log('fill passed successfully')   
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.fill(-20, "Welcome"))
} catch(error){
    console.log(error);
    console.log('fill failed test case'); 
}


try{
    console.log(arrayUtils.countRepeating([15, "Pradeep", "pradeep", '15', 16, "Pradeep",  15]))
    console.log('countRepeating passed successfully') 
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.countRepeating([5000, "5000", true, false, null]))
} catch(error){
    console.log(error);
    console.log('countRepeating failed test case');
}


try{
    console.log(arrayUtils.isEqual([1,2,3,1, null, false, 'true'], ['true', false, 1,3,2,1, null]))
    console.log('isEqual passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(arrayUtils.isEqual([1,2,3000,1,4,2,"Pradeep", "Kumar", 8, false, ], {1 : "this is an object"}))
} catch(error){
    console.log(error);
    console.log('isEqual failed test case');
}


try{
    console.log(stringUtils.camelCase("           Test this string for CAMELCASE"))
    console.log('camelCase passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(stringUtils.camelCase([]))
} catch(error){
    console.log(error);
    console.log('camelCase failed test case');
}


try{
    console.log(stringUtils.replaceChar("     Pradee palindrome plain"))
    console.log('replaceChar passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(stringUtils.replaceChar({}))
} catch(error){
    console.log(error);
    console.log('replaceChar failed test case');
}


try{
    console.log(stringUtils.mashUp("Pradeep", "Kumar"))
    console.log('mashUp passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(stringUtils.mashUp("P", "Kuasdasd"))
} catch(error){
    console.log(error);
    console.log('mashUp failed test case');
}

const first = {a: 2, b: 3, c : "Pradeep"};
const second = {a: 2, b:3, c : "Kumar"};
const third = {a: 2, b: 3};


try{
    console.log(objUtils.makeArrays([first, second, third]))
    console.log('makeArray passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(objUtils.makeArrays([[1,2,3],[1,2,3]]))
} catch(error){
    console.log(error);
    console.log('makeArray failed test case');
} 


const test1 = {i: {sA: "Hello", sB: [1,2,3], sC: "Class"}, x: 10, y: true, z: "Pradeep"}
const test2  = {y: true, x: 10, z: "Pradeep", i: {sB: [1,2,3], sC: "Class", sA: "Hello"}}

try{
    console.log(objUtils.isDeepEqual(test1, test2))
    console.log('isDeepEqual passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(objUtils.isDeepEqual("PRadeep", 1245))
} catch(error){
    console.log(error);
    console.log('isDeepEqual failed test case');
}


try{
    console.log(objUtils.computeObject({ a: 15, b: 10, c: 5 }, x => x * 1000 ))
    console.log('computeObject passed successfully')
} catch(error){
    console.log(error);
}
try{
    console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, "Hello Error"))
} catch(error){
    console.log(error);
    console.log('computeObject failed test case');
}
