import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/256/3145/3145765.png"
            className="h-8 me-2"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex flex gap-4">
            {links.map((items, i) => (
              <div key={i} className="flex items-center">
                {items.title === "Profile" ? <Link
                to={items.link}
                className="py-1 px-4 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                
              >
                {items.title}
              </Link> : <Link
                to={items.link}
                className="hover:text-blue-500 transition-all duration-300 hover:cursor-pointer"
                key={i}
              >
                {items.title}
              </Link>}
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex gap-4">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/LogIn"
                  className="py-1 px-4 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="py-1 px-4 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} text-white text-2xl font-semibold bg-zinc-800 h-full absolute left-0 top-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="hover:text-blue-500 transition-all duration-300 hover:cursor-pointer  mb-7"
            key={i}
          >
            {items.title}
          </Link>
        ))}
        <Link
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden")
          }
          to="/LogIn"
          className="py-2 mb-7 px-6 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        >
          LogIn
        </Link>
        <Link
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden")
          }
          to="/SignUp"
          className="py-2 px-4 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        >
          SignUp
        </Link>
      </div>
    </>
  );
}
