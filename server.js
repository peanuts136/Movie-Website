//common js package with preexisting code
import express from 'express';
//cross origin resource sharing, web domain can access resources from other domains like apis
import cors from 'cors';
import reviews from './api/reviews.route.js';
//uses the express framework
const app = express();
//middlewares
app.use(cors());
//allows website to read data as json when using git requests and such
app.use(express.json());
//url to use send and receive info
app.use('/api/v1/reviews', reviews);
//when we go to the url not included above
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app;