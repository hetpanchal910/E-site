import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";

import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import OrderManagement from "./components/Admin/OrderManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./pages/EditProductPage";


import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import ProductDetails from "./components/Products/ProductDetails";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const App = () => {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}>
        <BrowserRouter>
          <Toaster position="top-right" />

          <Routes>
            {/* user */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="collections/:collection" element={<CollectionPage />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="my-orders" element={<MyOrderPage />} />
              <Route path="order/:id" element={<OrderDetailsPage />} />
            </Route>

            {/* admin */}

            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>} >
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
            </Route>



          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider >
  )
}

export default App