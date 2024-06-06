import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/Auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if(localStorage.getItem('id') &&
        localStorage.getItem('token') &&
        localStorage.getItem('role')) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
        }
  },[]);


  return (
    <div>
      
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/all-books" element={<AllBooks/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/profile" element={<Profile/>}>
            <Route index element={<Favourites/>}  />
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>}  />
            <Route path="/profile/settings" element={<Settings/>}  />
          </Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/LogIn" element={<LogIn/>}></Route>
          <Route path = "view-book-details/:id" element={<ViewBookDetails/>}/>
        </Routes>
        <Footer/>
      
      
      
    </div>
  );
}

export default App;
