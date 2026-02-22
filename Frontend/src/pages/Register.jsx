

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slices/authSlice";
import { mergeCart } from "../redux/Slices/cartSlice";


const Register = () => {
const [name, setName] = useState("")
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
        e.preventDefault()
        dispatch(registerUser({name,email,password}))

    }
    
    return (
        <div className="flex">
            <div className="w-full  sm:w-1/2 flex  items-center justify-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className="w-full sm:max-w-md bg-white p-8 rounded-lg border shadow-sm ">
                    <div className="flex justify-center p-2 md:p-6">
                        <h2 className="text-[14px] md:text-xl font-medium">E-site</h2>
                    </div>
                    <h2 className="text-[14px] mb-3 md:text-2xl font-bold text-center md:mb-6">Register</h2>
                    <p className="text-[12px] md:text-normal text-center mb-3 md:mb-6">Enter your username and password</p>
                  
                  
                    <div className="mb-4">
                        <label className="block text-[12px] md:text-sm font-semibold mb-2 ">Name:</label>
                        <input type="text" value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            className="w-full text-[12px] md:text-normal p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[12px] md:text-sm font-semibold mb-2 ">Email:</label>
                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? "loading..." : "Sign Up"}
                    </button>
                    <p className="mt-6 text-center text-[12px] sm:text-sm text-black tracking-tighter">
                        have an account?
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:text-blue-500"> Login</Link>
                    </p>

                </form>

            </div>

            <div className="hidden sm:block w-1/2  ">
                <div className=" flex items-center justify-center w-full h-full overflow-hidden">
                    <img src="https://media.istockphoto.com/id/2251522634/photo/two-abstract-dark-fabric-backgrounds-featuring-luxurious-black-silk-texture-subtle-vertical.webp?a=1&b=1&s=612x612&w=0&k=20&c=SsZCyXuaNwT8pFE8SZ1k_3Jzygh8obPE607dynVSzi8=" alt="Login_img"
                        className="h-150 w-full object-cover " />
                </div>

            </div>


        </div>
    )
}

export default Register


