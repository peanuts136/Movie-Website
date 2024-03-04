import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

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
  }
)