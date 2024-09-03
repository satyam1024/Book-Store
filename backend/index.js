import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import  booksRoute  from "./routes/booksRoute.js";
import cors from 'cors';

const app= express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log('app is listening to port: ${PORT}');
});

app.get( '/',(req,res)=>{
    try{
    console.log(req)
    return res.status(404).send('Welcome to my app');
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL).then(()=>{
    console.log('APP is connected to mongoDB');
}).catch((error)=>{
    console.log(error);
});

