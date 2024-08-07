// import  Counter  from './features/counter/Counter';
import './App.css';
// import ProductList from './features/ProductList/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CheckOut from './pages/CheckOut';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useEffect } from 'react';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/Component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthUserAsync, selectUser, selectuserChecked } from './features/auth/authSlice';
import { fetchitemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrder from './features/User/components/UserOrder';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/User/userSlice';
import LogOut from './features/auth/Component/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/Component/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';
import { positions, Provider,transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckOut from './pages/StripeCheckOut';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
  transition: transitions.SCALE
};

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
      <Protected><Home></Home></Protected>   
    },
    {
      path: "/admin",
      element: 
      <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>   
    },
    {
      path: "/Login",
      element:<LoginPage></LoginPage>
    },
    {
      path:"/SignUp",
      element:<SignUpPage></SignUpPage>
    },
    {
      path:"/cartPage",
      element:<Protected><CartPage></CartPage></Protected>
    }
    ,
    {
      path:"/CheckOut",
      element:<Protected><CheckOut></CheckOut></Protected>
    },
    {
      path:"/product-detail/:id",
      element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>
    },
    {
      path:"admin/product-detail/:id",
      element:<ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
    },

    {
      path:"*",
      element:<PageNotFound></PageNotFound>
    },
    {
      path:"/order-Success/:id",
      element:<Protected><OrderSuccess></OrderSuccess></Protected>
    },
    {
      path:"/my-orders",
      element:<Protected><UserOrderPage></UserOrderPage></Protected>
    },
    {
      path:"/profile",
      element:<Protected><UserProfilePage></UserProfilePage></Protected>
    },
    {
      path:"/logOut",
      element:<LogOut></LogOut>
    },
    {
      path:"/forgot-password",
      element:<ForgotPasswordPage></ForgotPasswordPage>
    },
    {
      path:"/stripe-CheckOut/",
      element:(<Protected><StripeCheckOut></StripeCheckOut></Protected>)
    },
    {
      path:"/admin/AdminProductFormPage",
      element:<ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
    },
    {
      path:"/admin/AdminProductFormPage/edit/:id",
      element:<ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
    },
    {
      path:"/admin/AdminOrder",
      element:<ProtectedAdmin> <AdminOrderPage></AdminOrderPage></ProtectedAdmin>
    }
  ]);
  function App(){
    const user=useSelector(selectUser)
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(CheckAuthUserAsync())
    },[dispatch]);

    useEffect(()=>{
      //  dispatch(CheckAuthUserAsync())

      if(user){
      dispatch(fetchitemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
              }
    },[dispatch,user])
    const userChecked=useSelector(selectuserChecked)
  return (
    <div className="App">
      { userChecked &&
       <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router}/> 
      </Provider>
  }
      </div>
  );
}

export default App;
