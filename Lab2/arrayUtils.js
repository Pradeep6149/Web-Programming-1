function errorCheck(value, variableName){
    if(value === null) throw "Array does not exists.";
    if(!Array.isArray(value)) throw `${variableName || 'provided variable'} is not an Array`;
    if(value.length === 0) throw `${variableName || 'Input array'} is Empty`;
}

function errorCheckNonEmpty(value, variableName){
    if(value === null) throw "Array does not exists.";
    if(!Array.isArray(value)) throw `${variableName || 'provided variable'} is not an Array`;
}

function checkIsNumber(value, variableName){
    if(typeof value !== 'number') throw `${variableName || 'provided variable'} is not an number`;
    if(isNaN(value)) throw `${variableName || 'provided variable'} is NaN`;
}


const mean = function mean(array){
    errorCheck(array, "Input");
    for( let x of array) checkIsNumber(x, `${x}`)
    let sum = 0, len = array.length;
    for(let i of array) sum += i;
    sum = sum/len;
    return sum;
}

const medianSquared = function medianSquared(array){
    errorCheck(array, "Input");
    for( let x of array) checkIsNumber(x, `${x}`)
    array.sort(function(a,b){
        return a - b;
    });
    let center = Math.floor(array.length/2);
    let result = array[center];
    if(array.length % 2 == 0){
        result += array[center-1];
        result = result/2;
    } 
    return result * result;
}

const maxElement = function maxElement(array){
    errorCheck(array, "Input");
    for( let x of array) checkIsNumber(x, `${x}`);
    let result = {}, max =array[0], position =0; 
    for(let i=1; i < array.length ; i++){
        if(array[i] > max) {
            max = array[i];
            position = i;
        }
    }
    result[max] = position;
    return result;
}

const fill = function fill(end, value){
    if(end === null || end === undefined) throw "End argument does not exists";
    checkIsNumber(end, "End argument");
    if(end <= 0) throw "End argument must be greater than 0";
    end = Math.round(end)
    let result = new Array(end)
    if(arguments.length < 2){
        for(let i = 0; i < end ; i++){
            result[i] = i;
        }

    }
    else result.fill(value);
    
    return result;   
}

const countRepeating = function countRepeating(array){
    errorCheckNonEmpty(array, "Array");
    for(let x of array){
        if(!(typeof x == 'number' || typeof x == 'string')){
            throw `${x} is neither a String nor a number`
        } 
    }
    let result = {}, dummy = {};
    for(let x of array){
        dummy[x] = dummy[x] > 0 ? dummy[x] + 1 : 1;
        if(dummy[x] > 1) result[x] = dummy[x];
    }
    return result;
}


const compareArray = function compareArray(arr1, arr2){
    let flag = true;
    for(let i = 0; i<arr1.length ; i++){
        if(Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            flag = compareArray(arr1[i],arr2[i])
            if(flag === false) break
            continue
        }
        if(!(arr1[i] === arr2[i])){
            flag = false;
            break;
        }
    }
    return flag;
}

const isEqual = function isEqual(arrayOne, arrayTwo){
    errorCheckNonEmpty(arrayOne, "Array1");
    errorCheckNonEmpty(arrayTwo, "Array2");   
    if(arrayOne.length != arrayTwo.length) return false;
    for(let i = 0 ; i< arrayOne.length ; i++){
        if(Array.isArray(arrayOne[i])) arrayOne[i].sort();
        if(Array.isArray(arrayTwo[i])) arrayTwo[i].sort();
    }
    arrayOne.sort();
    arrayTwo.sort();
    let flag = true
    return compareArray(arrayOne, arrayTwo);
}

module.exports = {
    firstName: "Pradeep Kumar", 
    lastName: "Senthamarai Kannabiran", 
    studentId: "10468251",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};