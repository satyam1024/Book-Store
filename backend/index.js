import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
const app= express()
app.use(express.json());
app.listen(PORT, () => {
    console.log('app is listening to port: ${PORT}');
});

app.get( '/',(req,res)=>{

    console.log(req)
    return res.status(404).send('Welcome to my app')
});

app.post('/books',async (req,res)=>{
    try{

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(404).send({
                message:"Send all required field",
            });
        }
        const newBook={
            title: req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        };
        const book =await Book.create(newBook);
        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        resp.status(500).send({message:error.message});
    }
});

app.get('/books',async (req,res)=>{
    try{

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(404).send({
                message:"Send all required field",
            });
        }
        const newBook={
            title: req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        };
        const book =await Book.create(newBook);
        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        resp.status(500).send({message:error.message});
    }
});

mongoose
    .connect(mongoDBURL).then(()=>{
    console.log('APP is connected to mongoDB');
}).catch((error)=>{
    console.log(error);
});

