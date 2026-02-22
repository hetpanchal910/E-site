import  { useEffect } from 'react'
import MyOrderPage from "./MyOrderPage"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/Slices/authSlice";
import { clearCart } from "../redux/Slices/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get user state 
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is not loged in redirect to login page 
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    // Clear user and cart  and LocalStorage
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col">
          <div className="grow container mx-auto p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm-space-y-0">
                  

                  {/* left section */}
                  <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                      <h1 className="text-xl sm:text-2xl font-bold mb-4"> {user?.name} </h1>
                      <p className="text-lg text-gray-700 mb-4">{user?.email} </p>
                      <button onClick={ handleLogout } className="bg-cyan-900 w-full text-white py-2 px-4 rounded hover:bg-cyan-800">Log out</button>
                  </div>
                  {/* Right side */}
                  <div className="w-full md:w-2/3 lg:w-3/4">
                  <MyOrderPage />
                  </div>


              </div>
          </div>   
    </div>
  )
}

export default Profile