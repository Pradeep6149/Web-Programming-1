function errorCheckArrayObjects(inputArray){
    for(let i=0; i<inputArray.length; i++){
        if(typeof inputArray[i] !== "object") throw "Input is not array of objects"
        if(Array.isArray(inputArray[i])) throw "Input is not array of objects"
        if(Object.keys(inputArray[i]).length === 0) throw "Input has an empty object "
    }
    if(inputArray.length < 2) throw " Input array must contain atleast two objects"
}

function errorCheckObjects(obj, variableName){
    if(obj === null) throw `${variableName} is null`
    if(typeof obj != "object") throw `${variableName} is not an object`
    if(Array.isArray(obj)) throw `${variableName} is not an object`
}


const makeArrays = function makeArrays(objects){
    if(!(Array.isArray(objects))) throw "Input is not an array"
    errorCheckArrayObjects(objects)
    let result = new Array();
    for(let i=0 ; i<objects.length ; i++){
        result = result.concat(Object.entries(objects[i]));
    }
    return result;
}

const isDeepEqual = function isDeepEqual(obj1, obj2){
    errorCheckObjects(obj1, "First object")
    errorCheckObjects(obj2, "Second object")
    let variable1 = Object.keys(obj1).sort();
    let variable2 = Object.keys(obj2).sort();
    if( variable1.length !== variable2.length) return false;
    for(let i of variable1){
        let value_1 = obj1[i];
        let value_2 = obj2[i];
        if(typeof value_1 === "object" && typeof value_2 === "object" && !Array.isArray(value_1) && !Array.isArray(value_2)){
            if(!isDeepEqual(value_1,value_2)) return false;    
        }
        else if(Array.isArray(value_1) && Array.isArray(value_2)) {
            if((JSON.stringify(value_1) !== JSON.stringify(value_2))) return false
        } 
        else if(value_1 !== value_2){
            return false;
        }    
    }
    return true;
}

const computeObject = function computeObject(object, func){
    errorCheckObjects(object, "First Parameter")
    if(Object.keys(object).length == 0) throw "Object must have atleast one key/value "
    if(typeof func !== 'function') throw "Second parameter must be function"
    let result = {}
    let keyset = Object.keys(object);
    for( let i of keyset){
        if(typeof object[i] !== 'number') throw "All values in object must be numbers"
        result[i] = func(object[i]);
    }
    return result
}

module.exports = {
    firstName: "Pradeep Kumar", 
    lastName: "Senthamarai Kannabiran", 
    studentId: "10468251",
    makeArrays,
    isDeepEqual,
    computeObject
};