import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";

export default function ViewBookDetails() {
  const { id } = useParams();
  const [Books, setBooks] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setBooks(response.data);
    };
    fetch();
    // eslint-disable-next-line
  }, []);
  // console.log(Books.title);

  // handling favourites
  const headers = {
    id:localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  }
  const handleFav = async() => {
    const response = await axios.put('http://localhost:1000/api/v1/add-book-to-fav', {}, {headers});
    alert(response.data.message);
  }

  // handling Cart
  const handleCart = async() => {
    const response = await axios.put('http://localhost:1000/api/v1/add-to-cart', {}, {headers});
    alert(response.data.message);
  }
  return (
    <>
      {Books && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6 ">
            {" "}
            <div className="bg-zinc-800 rounded p-12 flex flex-col lg:flex-row justify-around ">
              {" "}
              <img
                src={Books.url}
                alt="/"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button onClick={handleFav} className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center">
                    <FaHeart /> <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button onClick={handleCart} className="text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-6 bg-blue-500 flex items-center justify-center">
                    <FaShoppingCart /> <span className="ms-4 block lg:hidden">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 flex items-center justify-center">
                    <FaEdit /> <span className="ms-4 block lg:hidden">Edit Book</span>
                  </button>
                  <button className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-6 bg-white flex items-center justify-center">
                  <MdOutlineDelete /> <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Books.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Books.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Books.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Books.language}
            </p>
            <p className="text-zinc-100 mt-4 font-semibold text-3xl">
              Price : ₹ {Books.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Books && (
        <div className="h-screen bg-zinc-900  flex item-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}
