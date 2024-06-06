import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import axios from 'axios';
import Loader from '../components/Loader/Loader'

export default function Profile() {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  
  useEffect(() => {
    const headers = {
      id: localStorage.getItem('id'),
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v1/get-user-info',{headers})
      setProfile(response.data);
    }
    fetch();
  }, [])
  
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col w-full text-white py-8 md:flex-row gap-4'>
      {!Profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div> }
      {Profile && <>
      <div className='w-full md:w-1/6  h-screen'><Sidebar data={Profile}/></div>
      <div className='w-full md:w-5/6 '><Outlet/></div>
      </>}
    </div>
  )
}
