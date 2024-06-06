import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

export default function Favourites() {
  const [FavBooks, setFavBooks] = useState();

  useEffect(() => {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-fav-books',{headers})
      setFavBooks(response.data);
    }
    fetch();
  }, [FavBooks])
  
  return (
    <>
      {FavBooks && FavBooks.length === 0 && (<div className='w-full h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center'>No Favourite Book to Display</div>)}
      <div className='grid grid-cols-4 gap-8'>
        {FavBooks && FavBooks.map((items,i) => (
          <div key={i}>
            <BookCard Books = {items} favourite = {true}/>
          </div>
        ))}
      </div>
    </>
  )
}
