const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
    
    try{
        // Creating first movie
        const billAndTed = await movies.create('Dummy',"Plot for first movie","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"], {director: "Dean Parisot", yearReleased : 2020});
        console.log(billAndTed); // Printing the newly created movie
    }catch(e){
        console.log(e.message);
    } 
    
    // try{
    //     // Creating Second movie
    //     const master = await movies.create("Second movie","Professor goes to jail", "PG-13", "2hr 31min","Action",['Vijay','Malavika'], {director: "Lokesh", yearReleased: 2021});
    // }catch(e){
    //     console.log(e.message);
    // } 
    
    // try{
    //     // Getting all movies from db and printing
    //     const allMovies = await movies.getAll();
    //     console.log(allMovies);
    // }catch(e){
    //     console.log(e.message);
    // } 
    
    // try{
    //     // Creating Third movie
    //     const thirdMovie = await movies.create("Third movie","Plot for third movie", "PG-13", "3hr 00min","Action",['Rajini','Malavika'], {director: "Shankar", yearReleased: 2010});
    //     console.log(thirdMovie); // Print the newly created movie
    // }catch(e){
    //     console.log(e.message);
    // } 

    // try{
    //     const allMovies = await movies.getAll();
    //     // Renaming the first movie
    //     const renameFirst = await movies.rename(allMovies[allMovies.length-3]._id.toString(), "Renamed first movie")
    //     // Printing the first movie with updated title
    //     console.log(renameFirst);
    // }catch(e){
    //     console.log(e.message);
    // } 

    // try{
    //     const allMovies = await movies.getAll();
    //     //removing the second movie
    //     const getRobo = await movies.remove(allMovies[allMovies.length-2]._id.toString())
    //     console.log(getRobo);
    // }catch(e){
    //     console.log(e.message);
    // }
    
    // try{
    //     // Getting all movies from db and printing
    //     const allMovies = await movies.getAll();
    //     console.log(allMovies);
    // }catch(e){
    //     console.log(e.message);
    // } 


    // try{
    //     // Creating a movie with bad paramater
    //     const robo = await movies.create('1947' , '',"PG-13", "3hr 01min","Action",["Rajini","Aishwarya Rai"],{director: "Shankar", yearReleased: '2010'});
    //     console.log(robo);
    // }catch(e){
    //     console.log(e.message);
    // }

    // try{
    //     // Trying to remove a movie that does not exist
    //     const getRobo = await movies.remove('60401beff06c7179602aed82')
    //     console.log(getRobo);
    // }catch(e){
    //     console.log(e.message);
    // }

    // try{
    //     // Trying to rename a movie that does not exist
    //     const getRobo = await movies.rename('60401bf0f06c7179602aed84', 'Pradeep fjksbfisdf')
    //     console.log(getRobo);
    // }catch(e){
    //     console.log(e.message);
    // }

    // try{
    //     // Trying to rename a movie with bad parameter
    //     const getRobo = await movies.rename(51465, 5145)
    //     console.log(getRobo);
    // }catch(e){
    //     console.log(e.message);
    // }

    // try{
    //     // Trying to get a movie by ID that does not exist
    //     const allMovies = await movies.get('507f1f77bcf86cd799439011');
    //     console.log(allMovies);
    // }catch(e){
    //     console.log(e.message);
    // } 
    

    const db = await connection();
    await db.serverConfig.close();

};

main().catch((error) => {
  console.log(error);
});