const people = require('./people');
const work = require('./work');
  
async function main(){

    try{
        console.log(await people.getPersonById(430));
    }catch(e){
        console.log(e)
    }
    try{
        console.log(await people.getPersonById(""));
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await people.howManyPerState('WA'));
    }catch(e){
        console.log(e)
    }
    try{
        console.log(await people.howManyPerState(''));
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await people.personByAge(43));
    }catch(e){
        console.log(e)
    }
    try{
        console.log(await people.personByAge(1000));
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await people.peopleMetrics());
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await work.listEmployees());
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await work.fourOneOne('240-144-7553'));
    }catch(e){
        console.log(e)
    }
    try{
        console.log(await work.fourOneOne(''));
    }catch(e){
        console.log(e)
    }

    try{
        console.log(await work.whereDoTheyWork('299-63-8866'));
    }catch(e){
        console.log(e)
    }
    try{
        console.log(await work.whereDoTheyWork('2a7-85-0a56'));
    }catch(e){
        console.log(e)
    }
} 

main();