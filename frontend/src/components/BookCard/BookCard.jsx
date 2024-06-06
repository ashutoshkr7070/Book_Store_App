import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BookCard({Books, favourite}) {
  // console.log(Books)
  const headers = {
    id:localStorage.getItem('id'),
    authorizaion: `Bearer ${localStorage.getItem('token')}`,
    bookid: Books._id,
  }

  const handleRemoveBook = async() => {
    const response = await axios.put('http://localhost:1000/api/v1/remove-book-from-fav',{},{headers})
    alert(response.data.message);
  }
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
    <Link to={`/view-book-details/${Books._id}`}>
      <div >
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img className='h-[25vh]' src={Books.url} alt="/" /> 
        </div>
        {/* <h2 className='mt-4 text-xl font-semibold'>{Books.title}</h2> */}
        <div className='truncate md:text-clip'>
          <h5 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{Books.title}</h5>
          <p className='mt-2 text-zinc-400 font-semibold'>by {Books.author}</p>
          <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {Books.price}</p>
        </div>
      </div>
    </Link>
    {favourite && (
      <button onClick={handleRemoveBook} className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'>
        Remove from Favourites
      </button>
    )}
    </div>
  )
}
