import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';

export default function Home() {
    const [books,setBooks]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:5555/books').then((res)=>{
            setBooks(res.data.data);
            setLoading(false);
        }).catch((error)=>{
            console.log(error);
        })
        

    },[]);
  return (
    <div className ='p-4'>
        <div className='flex justify-between items center'>
            <h1 className='text-3x1 my-8'>
                Book list
            </h1>
            <Link to ='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4x1'/>
            </Link>
        </div>
        {loading?(
            <Spinner/>
        ):(
            <table className='w-full border-seprate border-spacing-2'>
                <tbody>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                        <th className='border border-slate-600 rounded-md '>Operations</th>
                    </tr>
                </tbody>
                <tbody>
                    {books.map((book,index)=>(
                        <tr key ={book._id} className='h-8'>
                            <td className='border vorder-slate-700 rounded-md text-center'>{index+1}</td>
                            <td className='border vorder-slate-700 rounded-md text-center'>{book.title}</td>
                            <td className='border vorder-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                            <td className='border vorder-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                            <td className='border vorder-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={'/books/details/${book._id}'}>
                                        <BsInfoCircle className='text-2x1 text-green-800'></BsInfoCircle>
                                    </Link>
                                    <Link to={'/books/details/${book._id}'}>
                                        <AiOutlineEdit className='text-2x1 text-yellow-600'></AiOutlineEdit>
                                    </Link>
                                    <Link to={'/books/details/${book._id}'}>
                                        <MdOutlineDelete className='text-2x1 text-red-600'></MdOutlineDelete>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                        
                    }

                </tbody>

            </table>
        )

        }
    </div>
  )
}
