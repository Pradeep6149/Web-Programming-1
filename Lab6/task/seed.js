const { ObjectID } = require('mongodb');
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const patrick = await books.addBook('First', {authorFirstName: "Stephen", authorLastName: "King"}, ["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"], "1/28/1977", "Jack Torrance’s new job at the");
  const second = await books.addBook('Second book', {authorFirstName: "Pradeep", authorLastName: "Kumar"}, ["Novel", "Action"], "10/25/1996", "Dummy summary for second book");
  const third = await books.addBook('Thirs book', {authorFirstName: "Ptrik", authorLastName: "Hill"}, ["Novel", "Comedy", "Action"], "10/25/1996", "Dummy summary for Third book");
  const forth = await books.addBook('Forth Book', {authorFirstName: "awdawdaw", authorLastName: "awdawdaw"}, ["4354", "434", "4334"], "10/25/2020", "Dummy summary for Four book");
  const Fifth = await books.addBook('fifth book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");
  const sixth = await books.addBook('sixth book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");
  const seventh = await books.addBook('seventh book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");
  const eigth = await books.addBook('eigth book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");
  const ninth = await books.addBook('ninth book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");
  const tenth = await books.addBook('tenth book', {authorFirstName: "qqqqq", authorLastName: "wwww"}, ["111", "Come222dy", "222"], "10/25/1996", "Dummy summary for IFfth book");

  const id = patrick._id;
  const patrick_review = await reviews.addReview(new ObjectID, "AFIEAHOFI" , " FIAEOIF", 5, "1/5/2020",  "Good", id)
  const id2 = second._id;
  const a1 = await reviews.addReview(new ObjectID, "Second Titlte" , " Dummy reviewes", 3.5, "1/5/2020",  "Good", id2)
  const id3 = third._id;
  const a2 = await reviews.addReview(new ObjectID, "Third Titlte" , " Dummy reviewes", 3.5, "1/5/2020",  "Good", id3)
  const id4 = forth._id;
  const a3 = await reviews.addReview(new ObjectID, "forth Titlte" , " Dawdawummy reviewes", 1, "1/5/2020",  "Good", id4)
  const id5 = Fifth._id;
  const a4 = await reviews.addReview(new ObjectID, "fifth Titlte" , " Dawdwadawummy reviewes", 4, "1/5/2020",  "Good", id5)
  const id6 = sixth._id;
  const a5 = await reviews.addReview(new ObjectID, "sixth Titlte" , " Dummy reviewes", 3.5, "1/5/2020",  "Good", id6)
  const id7 = seventh._id;
  const a7 = await reviews.addReview(new ObjectID, "seventh Titlte" , " Dummy reviewes", 3, "1/5/2020",  "Good", id7)
  const id8 = eigth._id;
  const a8 = await reviews.addReview(new ObjectID, "eigth Titlte" , " Dummy reviewes", 3.5, "1/5/2020",  "Good", id8)
  const id9 = ninth._id;
  const a9 = await reviews.addReview(new ObjectID, "ninth Titlte" , " Dummy reviewes", 3.52, "1/5/2020",  "Good", id9)
  const id10 = tenth._id;
  const a10 = await reviews.addReview(new ObjectID, "tenth Titlte" , " Dummy reviewes", 1, "1/5/2020",  "Good", id10)



  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();