const { default: axios } = require("axios")

async function getApiDataPeople() { 
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json'); 
    return data;
}

async function getApiDataWork() {
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

const listEmployees = async function listEmployees(){
    let peopleData = await getApiDataPeople();
    let workData = await getApiDataWork();
    let result = [], a = 0;
    let All_company = [], employeeList = [];
    let dummyobj;
    for(let i = 0; i < workData.length ; i++){
        All_company[a] = workData[i]['company_name']
        employeeList[a++] = workData[i]['employees']
    }
    for(let i = 0 ; i < All_company.length; i++){
        let  obj1= {}, dummy=[];
        obj1['company_name'] = All_company[i];
        for(let j = 0; j < employeeList[i].length ; j++){
            let id_employee = employeeList[i][j]
            dummyobj = {}
            for(let k = 0; k<peopleData.length ; k++){
                if(peopleData[k]['id'] === id_employee){
                    dummyobj['first_name'] = peopleData[k]['first_name'];
                    dummyobj['last_name'] = peopleData[k]['last_name'];
                    dummy.push(dummyobj)
                    break;
                }
            }     
        }
        obj1['employees'] = dummy;
        result.push(obj1);
    }
    return result; 
}

const fourOneOne = async function fourOneOne(phoneNumber){
    if(!phoneNumber) throw 'Phone Number must be given'
    if(typeof phoneNumber !== 'string') throw `${phoneNumber} must be a string`
    phoneNumber = phoneNumber.trim()
    if(!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) throw `${phoneNumber} is not in proper ###-###-#### format`
    let workData = await getApiDataWork();
    let result = {};
    for(let i = 0; i < workData.length ; i++){
        if(workData[i]['company_phone'] === phoneNumber){
            result['company_name'] = workData[i]['company_name'];
            result['company_address'] = workData[i]['company_address'];
            return result
        }
    }
    throw `No company exists for ${phoneNumber}`
}

const whereDoTheyWork = async function whereDoTheyWork(ssn){
    if(!ssn) throw 'ssn must be given'
    if(typeof ssn !== 'string') throw `${ssn} must be a string`
    ssn = ssn.trim()
    if(!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) throw `${ssn} is not in proper ###-##-#### format`
    let peopleData = await getApiDataPeople();
    let workData = await getApiDataWork();
    let full_name = '', id;
    for(let i = 0; i < peopleData.length ; i++){
        if(peopleData[i]['ssn'] === ssn){
            full_name = peopleData[i]['first_name'] +' '+  peopleData[i]['last_name']
            id = peopleData[i]['id']
            break;
        }
    }
    if(full_name === '') throw `No one exists with the ssn ${ssn}`
    for(let i = 0 ; i<workData.length ; i++){
        let employeeList = workData[i]['employees']
        for(let j = 0 ; j < employeeList.length; j++){
            if(employeeList[j] === id)
            return `${full_name} works at ${workData[i]['company_name']}.`
        }
    }
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}