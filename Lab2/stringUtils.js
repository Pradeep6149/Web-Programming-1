function errorCheckString(errString, variableName){
    if(errString === null) throw "There is no String";
    if(!(typeof errString === 'string')) throw `${variableName} is not a string`
    if(errString.length <= 0) throw "Input String is of length 0"
    if(errString.trim().length === 0) throw `Input has only spaces`
}

const camelCase = function camelCase(string){
    errorCheckString(string, "Input")
    var result = ""
    string = string.trim();
    let str1 = string.toLowerCase()
    return str1.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(current, index){
        if(+current === 0) return "";
        return index === 0 ? current.toLowerCase() : current.toUpperCase();
    });
}

const replaceChar = function replaceChar(string){
    errorCheckString(string, "Input string")
    string = string.trim()
    let firstChar = string.charCodeAt((0));
    let dummy = 0;
    for(let i = 1 ; i < string.length ; i++){
        if(string.charCodeAt((i)) === firstChar || string.charCodeAt((i)) === firstChar-32 || string.charCodeAt((i)) === firstChar+32){
            if(dummy % 2 == 0) string = string.substring(0, i) + '*' + string.substring(i+1);
            else  string = string.substring(0, i) + '$' + string.substring(i+1);
            dummy++;
        }
    }
    return string;
}

const mashUp = function mashUp(string1, string2){
    errorCheckString(string1, "Input 1")
    errorCheckString(string2, "Input 2")
    string1 = string1.trim()
    string2 = string2.trim()
    if(string1.length < 2)  throw `${string1} must have atleast 2 character`
    if(string2.length < 2)  throw `${string2} must have atleast 2 character`
    return string2.substring(0,2) + string1.substring(2,string1.length) + ' ' + string1.substring(0,2) + string2.substring(2,string2.length)
}




module.exports = {
    firstName: "Pradeep Kumar", 
    lastName: "Senthamarai Kannabiran", 
    studentId: "10468251",
    camelCase,
    replaceChar,
    mashUp
};