const { ObjectID } = require('mongodb');
const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;

function errorcheckString(val, name){
    if(!val) throw new Error( `${name} must be provided`);
    if(typeof val !== 'string') throw new Error(`${name} must be string`);
    if(val.trim() === '') throw new Error(`${name} should not be empty`);
}

module.exports = {

    async create(title, plot, rating, runtime, genre, cast, info){
        errorcheckString(title, 'Title');
        errorcheckString(plot, 'Plot');
        errorcheckString(rating, 'Rating');
        errorcheckString(runtime, 'Runtime');
        errorcheckString(genre, 'Genre');
        if(!cast) throw new Error('Cast must be provided');
        if(typeof cast !== 'object' || !Array.isArray(cast)) throw new Error('Cast must be of type Array');
        if(cast.length === 0) throw new Error('Cast must have atleast one element');
        for(let val of cast){
            errorcheckString(val,"Value in cast");
        }
        if(!info) throw new Error('Info must be provided');
        if(typeof info !== 'object') throw new Error('Info must be of type object');
        if(Array.isArray(info)) throw new Error('Info must be of type object');
        if(Object.keys(info).length !== 2) throw new Error('Info should have 2 values - director and year released');
        errorcheckString(info.director, "Director in info")
        if(!info.yearReleased && info.yearReleased !== 0) throw new Error('year released must be provided')
        if(typeof info.yearReleased !== 'number') throw new Error('year must be number')
        if(info.yearReleased.toString().length !== 4) throw new Error('Year must be of four digits')
        let d  = new Date();
        let y = d.getFullYear()+5
        if(info.yearReleased < 1930 || info.yearReleased > y) throw new Error(`year released should be within 1930 and ${y}`)
        const moviesCollection = await movies();
        let newMovie = {
            title : title,
            plot : plot,
            rating : rating, 
            runtime : runtime,
            genre : genre, 
            cast : cast, 
            info : info
        };
        const insertInfo = await moviesCollection.insertOne(newMovie);
        if (insertInfo.insertedCount === 0) throw new Error('Movie connot be created');
        const newId = insertInfo.insertedId;
        const movie = await this.get(newId.toString());
        movie._id = movie._id.toString();
        return movie;
    },

    async get(id) {
        errorcheckString(id, "ID"); 
        id = id.trim();
        const moviesCollection = await movies();
        const mov = await moviesCollection.findOne({ _id: ObjectID(id) });
        if (mov === null) throw new Error(`No movie with the id ${id}`);
        mov._id = mov._id.toString();
        return mov;
    },
  
    async getAll() {
        const moviesCollection = await movies();
        const movieList = await moviesCollection.find({}).toArray(); 
        for(let i = 0 ; i<movieList.length;i++){
            movieList[i]._id = movieList[i]._id.toString();
        }
        return movieList;
    },
  
    async remove(id) {
        errorcheckString(id,'ID') 
        id = id.trim();     
         const moviesCollection = await movies();
        let name = (await this.get(id)).title;
        const deletionInfo = await moviesCollection.deleteOne({ _id: ObjectID(id) });
        if (deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete movie with id of ${id}`);
        }
        return `${name} has been successfully deleted`;
    },

    async rename(id, newTitle) {
        errorcheckString(id, 'ID');
        id = id.trim();
        errorcheckString(newTitle, 'New Title for movie');
        const moviesCollection = await movies();
        const updatedMovie = {
            title: newTitle
        };
        const updatedInfo = await moviesCollection.updateOne(
            { _id: ObjectID(id) },
            { $set: updatedMovie }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw new Error('Movie cannot be renamed');
        }
        return await this.get(id);
    }
};