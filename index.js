import app from "./server.js"
import mongodb from "mongodb"
//data access object pattern separates the business logic from the details to access data
import ReviewsDAO from "./dao/reviewsDAO.js"

//From mongodb itself
const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
/*The uri variable contains the connection string, which includes the username, password, cluster information, and some options.*/
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.r9uomhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000; 

MongoClient.connect(
  uri, {
    /* max people on the app on a given time,*/
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
.catch(err => {
  console.error(err.stack);
  process.exit(1);
})
//Can run at the same time as other code
//If connection is successful, print that the connecrevtion to mongoDB is successful
.then(async client =>{
  await ReviewsDAO.injectDB(client)
  app.listen(port, () =>{
    console.log(`listening on port ${port}`);
  })
})