const { default: axios } = require("axios")

const getPersonById = async function getPersonById(id){
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')   
    if(!id && id !== 0) throw "id parameter must be passed"
    if(typeof id !== 'number') throw `${id} is not a number`
    let flag = 0
    for(let i = 0 ; i < data.length ; i++){
        if(data[i]['id'] === id ) {
            flag = 1;
            return data[i];
        }
    }
    if(flag === 0) throw `ID  ${id} is not within the range`
}


const howManyPerState = async function howManyPerState(stateAbbrv){
    if(!stateAbbrv) throw "Please provide the state abbreviation";
    if(typeof stateAbbrv !== 'string') throw `${stateAbbrv} is not a string.`
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    let count = 0;
    for(let i = 0; i<data.length ; i++){
        if(data[i]['address']['state'] === stateAbbrv || data[i]['address']['state'] === stateAbbrv.toLowerCase() || data[i]['address']['state'] === stateAbbrv.toUpperCase()) count++;
    }
    if(count === 0) throw `There are no people in ${stateAbbrv}`
    return  count;
}

const personByAge = async function personByAge(index){
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')   
    if(!index && index !== 0) throw "Index parameter must be passed"
    if(typeof index !== 'number') throw `${index} is not a number`
    if(index < 0 || index >= data.length) throw `${index} must be within range`
    let result = {}
    for(let i = 0 ; i<data.length ; i++){
        let temp = new Date(data[i]['date_of_birth']) 
        let month = Date.now() - temp.getTime();
        let temp1 = new Date(month);
        let y = temp1.getUTCFullYear();
        data[i]['age'] = Math.abs(y - 1970); 
    }
    data.sort((person1, person2) => {
        return  new Date(person1['date_of_birth']) - new Date(person2['date_of_birth']);
    });
    result['first_name'] = data[index]['first_name'];
    result['last_name'] = data[index]['last_name'];
    result['date_of_birth'] = data[index]['date_of_birth'];
    result['age'] = data[index]['age']
    return result;
}

const peopleMetrics = async function peopleMetrics(){
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json') 
    let result = {totalLetters:0, totalVowels : 0 , totalConsonants : 0, longestName : '', shortestName : '', mostRepeatingCity :'', averageAge : 0},
     dummyStates = {};
    let consonant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'], 
    vowel = ['a','e','i','o','u','A','E','I','O','U'];
    let totalAge = 0;
    for(let i = 0 ; i<data.length ; i++){
        let temp = new Date(data[i]['date_of_birth']) 
        let month = Date.now() - temp.getTime();
        let temp1 = new Date(month);
        let y = temp1.getUTCFullYear();
        data[i]['age'] = Math.abs(y - 1970);
        data[i]['full_name'] = data[i]['first_name'] + ' ' + data[i]['last_name']; 
        for ( let j of data[i]['full_name']){         
            if(consonant.includes(j)) {
                result.totalConsonants++
                result.totalLetters++; 
            }        
            else if(vowel.includes(j)) {
                result.totalVowels++;
                result.totalLetters++; 
            }
        }
        totalAge += data[i]['age'];
        if(!dummyStates[data[i]['address']['city']]) dummyStates[data[i]['address']['city']] = 1
        else dummyStates[data[i]['address']['city']] = dummyStates[data[i]['address']['city']] + 1
    }
    data.sort((a,b) =>  b['full_name'].length - a['full_name'].length)
    let cityArray = Object.entries(dummyStates).sort((a,b) => b[1] - a[1])
    result['mostRepeatingCity'] = cityArray[0][0]
    result['shortestName'] = data[data.length -1]['full_name']
    result['longestName'] = data[0]['full_name']
    result['averageAge'] = totalAge/data.length;
    return result;
}





module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}

