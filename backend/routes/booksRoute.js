import express from 'express';
import { Book } from '../models/bookModel.js';

const router =express.Router();

router.post('/',async (req,res)=>{
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
        res.status(500).send({message:error.message});
    }
});

router.get('/',async (req,res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const { id }=req.params;
        const book= await Book.findById(id);
        return res.status(200).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.put('/:id',async (req,res)=>{
    try{

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(404).send({
                message:"Send all required field",
            });
        }
        const { id }=req.params;
        const result= await Book.findByIdAndUpdate(id,req.body);
        if(!result){
        return res.status(404).json({message:'book not found'});
        }
        return res.status(200).json({message:'book updated'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.delete('/:id',async (req,res)=>{
    try{

        const { id }=req.params;
        const result= await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'book not found'});
        }
        return res.status(200).json({message:'book updated'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;