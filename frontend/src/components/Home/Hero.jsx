import React from "react";
import { Link } from "react-router-dom";
import hero from "./3.png";

export default function Hero() {
  return (
    <div className="h-full md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="mr-4 w-full mb-5 md:mb-0 lg:w-3/6 flex flex-col items-center md:items-start justify-center">
        <h1 className="text-4xl mb-4 lg:text-6xl font-semibold text-yellow-100 text-center md:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 mb-4 text-xl text-zinc-300 text-center md:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiritaion in our curated collection of books
        </p>
        <div className="mt-8">
          <Link to="/all-books" className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className=" w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center"> 
          <img
            src={hero}
            className="h-full"
            alt="hero"
          />
        
      </div>
    </div>
  );
}
