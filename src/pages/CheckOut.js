import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"

import {
  deleteCartByAsync,
  selectCart,  
  updateCartByAsync
} from '../features/cart//cartSlice';
import { useState } from 'react';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { updateUserAsync } from '../features/User/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/User/userSlice';
import { discountPrice } from '../Constant';
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]
  
const addresses=[
    {
        name:"jack",
        street:'11th main',
        city:"delhi",
        pinCode:299929,
        state:'Delhi',
        phoneNo:1234567890
    },
    {
        name:"peter",
        street:'13th floor',
        city:"kolkata",
        pinCode:292329,
        state:'kolkata',
        phoneNo:1289230978
    }
]

const CheckOut = () => {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm()

  const dispatch = useDispatch();
  const userInfo=useSelector(selectUserInfo)
  const [open, setOpen] = useState(true)
  const items=useSelector(selectCart)
  const currentOrder=useSelector(selectCurrentOrder)
  // const totalAmount=100
  // const totalItems=10
  console.log(items)
  // const totalAmount=items.reduce((ammount,item)=>discountPrice(item.product)*item.quantity+ammount,0)
  // const totalItems=items.reduce((total,item)=>parseInt(item.quantity)+total,0)
  const totalAmount = items.reduce(
    (ammount, item) => discountPrice(item.product) * item.quantity + ammount,
    0
  );
  const totalItems = items.reduce(
    (total, item) => parseInt(item.quantity) + total,
    0
  );  
  const [selectedAddress,setSelectedAddress]=useState(null)
  const [selectedPayment,setSelectedPayment]=useState("cash")
 const handleQuantity=(e,item)=>{
  dispatch(updateCartByAsync({id:item.id,quantity:+e.target.value}))
 }

 const handleDelete=(e,id)=>{
   dispatch(deleteCartByAsync(id))
 }
 const handelAddress=(e)=>{
  console.log(e.target.value)
  setSelectedAddress(userInfo.addresses[e.target.value])
 }
 const handlePayment=(e)=>{
  console.log(e.target.value)
  setSelectedPayment(e.target.value)
 }

 const handleOrder=(e)=>{
  // console.log("order")
  if(selectedAddress && selectedPayment){
    const order={items,totalAmount,totalItems,selectedAddress,selectedPayment,user:userInfo.id,status:"pending"}
    dispatch(createOrderAsync(order))  
  }
  else{
    alert("Enter the Address and Payment method")
  }
  
  // TODO:redirect to order success page
  // TODO:clear cart after order
  // TODO:on server change stock number of items
 }
  return (
    <>
    {!items.length && <Navigate to='/' replace={true}></Navigate>}
     {currentOrder &&  currentOrder.selectedPayment==='cash'&& (<Navigate to={`/order-Success/${currentOrder.id}`} replace={true}></Navigate>)}
     {currentOrder && currentOrder.selectedPayment==='card' && (<Navigate to={`/stripe-CheckOut/`} replace={true}></Navigate>)}
     
     <div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
     <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className='lg:col-span-3'>
         <form className='bg-white px-5 py-4 my-10' noValidate onSubmit={handleSubmit((data)=>{dispatch(updateUserAsync({...userInfo,addresses:[...userInfo.addresses,data]}));reset();})}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" font-semibold text-2xl leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("fullName",{required:'full name is required'})}
                  id="full-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{required:'email is required'})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone-no" className="block text-sm font-medium leading-6 text-gray-900">
                PhoneNo
              </label>
              <div className="mt-2">
              <input
                  id="phoneNo"
                  {...register("PhoneNo",{required:'PhoneNo is required'})}
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street",{required:'Street address is required'})}
                  id="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city",{required:'City is required'})}
                 
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("state",{required:'State is required'})}

                  id="region"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                PIN code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("pinCode",{required:'PIN code is required'})}

                  id="PIN-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose form Existing addresses 
          </p>
          <ul role="list" >
      {userInfo.addresses?.map((address,index) => (
        <li key={address.fullName} className="flex justify-between gap-x-6 py-4 border-solid border-2 border-gray px-3 mb-3 ">
            
          <div className="flex min-w-0 gap-x-4">
          <input
                    id="address"
                    name="address"
                    value={index}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handelAddress}
                  />
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">Name:{address.fullName}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-900">PhoneNo:{address.PhoneNo}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-900">State:{address.state}</p>

            </div>
          </div>

          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xs leading-5 text-gray-900">address</p>
            </div>
             <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xs leading-5 text-gray-500">{address.street}</p>
            </div>
            <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xs leading-5 text-gray-500">{address.city}</p>
             </div> 
             <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xs leading-5 text-gray-500">{address.pinCode}</p>
             </div>
           </div>


        </li>
))}
    </ul>

          <div className="mt-10 space-y-10">
            
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment method</legend>
              {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    type="radio"
                    value="cash"
                    checked={selectedPayment==="cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handlePayment}
                  />
                  <label htmlFor="cash-payment" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="Card"
                    name="payments"
                    type="radio"
                    value="card"
                    checked={selectedPayment==="card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handlePayment}
                  />
                  <label htmlFor="card-payment" className="block text-sm font-medium leading-6 text-gray-900">
                    Card
                  </label>
                </div>
                
              </div>
            </fieldset>
          </div>
        </div>
      </div>

         </form>
        </div>



       {/*  <div className='lg:col-span-2'>
        <div className=" mt-10 mx-auto max-w-7xl px-1  sm:px-0  lg:px-0" style={{backgroundColor:"#eceaea"}}>
    <div className="mt-8">
    <div className="flow-root">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
    <h2 className=" text-4xl mt-3 mb-3 font-bold leading-9 tracking-tight text-gray-900">
            Cart
          </h2>
      <ul role="list" className="">
        {products.map((product) => (

          <li key={product.id} className="flex py-6 border-solid border-4 border-gray" >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>


            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="ml-4">{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500">
                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900 mr-2">
                  Qty
                 </label>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>

                  </select>
                
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
          // </div>
        ))}
      </ul>
      </div>
    </div>
  </div>
{/* // </div> */}

{/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>$262.00</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <a
      href="#"
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Pay and Order
    </a>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or{' '}
      <Link to="/">
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
       
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
    </p>
  </div>
</div>
</div>
</div>
        </div> */} 









         <div className='lg:col-span-2'>
         <div className=" mt-10 mx-auto max-w-7xl px-4  sm:px-6  lg:px-8" style={{backgroundColor:"#eceaea"}}>
    
 
    <div className="mt-8">
    <div className="flow-root">
    <div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0" >
    <h2 className=" text-4xl mt-3 mb-3 font-bold leading-9 tracking-tight text-gray-900">
            Cart
          </h2>
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {items.map((item) => (

          <li key={item.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={item.product.href}>{item.product.title}</a>
                  </h3>
                  <p className="ml-4">{discountPrice(item)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500">
                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900 mr-2">
                  Qty
                 </label>
                  <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option> 
                  </select>
                
                </div>

                <div className="flex">
                  <button onClick={(e)=>handleDelete(e,item.id)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
          // </div>
        ))}
      </ul>
      </div>
    </div>
  </div>
{/* // </div> */}
<div className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 py-5" >

<div className="border-t  border-gray-200 px-0 py-0 sm:px-0">
  <div className="flex  my-3 justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${totalAmount}</p>
  </div>

  <div className="flex my-3 justify-between text-base font-medium text-gray-900">
    <p>Total Items In Cart</p>
    <p>{totalItems} Items</p>
  </div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <div
      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      onClick={handleOrder} 
    >
      Order Now
    </div>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or{' '}
      <Link to="/">
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
      </Link>
    </p>
  </div>
</div>
</div>
</div>
         </div>





      </div>  
    </div>
     </div>
    </>
  )
}

export default CheckOut