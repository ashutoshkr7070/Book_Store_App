import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

export default function AllBooks() {
  const [Books, setBooks] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
      setBooks(response.data);
    };
    fetch();    
  }, [])

  return (
    <div className='bg-zinc-900 h-auto py-8 px-12'>
      <h4 className='text-3xl text-yellow-100'>All Available Books</h4>
        {!Books && <div className='flex items-center justify-center my-8'><Loader/></div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {Books && Books.map((items, i) => {
          return <div key={i}><BookCard Books={items}/> </div>
        })}
      </div>
    </div>
  )
}
