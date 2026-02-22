import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from "../redux/Slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { mergeCart } from "../redux/Slices/cartSlice"
const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user, guestId , loading } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : redirect);
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : redirect);
      }
    }
  }, [user, guestId, cart, navigate, redirect, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  
  return (
    <div className="flex">
      <div className="w-full  sm:w-1/2 flex  items-center justify-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full sm:max-w-md bg-white p-8 rounded-lg border shadow-sm ">
          <div className="flex justify-center p-2 md:p-6">
            <h2 className="text-[14px] md:text-xl font-medium">E-site</h2> 
          </div>
          <h2 className="text-[14px] mb-3 md:text-2xl font-bold text-center md:mb-6">Login</h2>
          <p className="text-[12px] md:text-normal text-center mb-3 md:mb-6">Enter your username and password</p>
          <div className="mb-4">
            <label className="block text-[12px] md:text-sm font-semibold mb-2 ">Email:</label>
            <input type="email" value={email}
              onChange={(e) =>  setEmail(e.target.value) }
              placeholder="Enter Email"
              className="w-full text-[12px] md:text-normal p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[12px] md:text-sm font-semibold mb-2 ">Password:</label>
            <input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full text-[12px] md:text-normal p-2 border rounded"
            />
          </div>
          <button type="submit" className="text-[12px] sm:text-normal  w-full bg-black px-2 py-2 text-white rounded-lg">
            {loading ? "loading" :  "Sign In" }
            
           </button>
          <p className="mt-6 text-center text-[12px] sm:text-sm text-black tracking-tighter">
            Don't have an account? 
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:text-blue-500"> Register</Link>
          </p>

        </form>
       
      </div>

      <div className="hidden sm:block w-1/2 bg-red-500 ">
        <div className=" flex items-center justify-center w-full h-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1644483518975-1a74bff3ab94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZ2luJTIwY2xvdGh8ZW58MHx8MHx8fDA%3D" alt="Login_img"
            className="h-150 w-full object-cover " />
        </div>

      </div>

      
    </div>
  )
}

export default Login