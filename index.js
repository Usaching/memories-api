 import express  from 'express';
 import bodyParser from 'body-parser';
 import mongoose from 'mongoose';
 import  cors from 'cors';
 import dotenv from 'dotenv';
 import postRoutes from './routes/posts.js';

 //http://localhost:5000/posts
 const app = express();
 dotenv.config();

 //express middleware is used to connect this to our application

 // setting up body-parser so that properly send our request
 app.use(bodyParser.json({limit: "30mb", extended: true}));
 app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
 app.use(cors());
 
 app.use('/posts', postRoutes);
  //Connect application with real database

//  const CONNECTION_URL = 
 const PORT = process.env.PORT || 5000;
 // this is setup for simplycity purposes so that we dont get error and warnning
//  mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
 mongoose.connect(process.env.CONNECTION_URL)
    .then(()=> app.listen(PORT, () => console.log(`Server running on Port: http://localhost: ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

 //this again makes sure that we dont get any warnning in the console
//  mongoose.set('useFindAndModify', false);   



