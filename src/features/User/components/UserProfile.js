import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount, selectUserInfo, updateUserAsync,
} from '../userSlice';
import { useForm } from "react-hook-form"

// import { selectUser } from '../../auth/authSlice';

export default function UserProfile() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const userInfo=useSelector(selectUserInfo)
  const [selectedIndex,setSelectedIndex]=useState(-1)
  const [showAddAddressForm,setShowAddAddressForm]=useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const handleEdit=(updateAddress,index)=>{
    const newUser={...userInfo,addresses:[...userInfo.addresses]}
    newUser.addresses.splice(index,1,updateAddress)
    dispatch(updateUserAsync(newUser))
    setSelectedIndex(-1)
  }

  const handleRemove=(e,index)=>{
    const newUser={...userInfo,addresses:[...userInfo.addresses]}
    newUser.addresses.splice(index,1)
    dispatch(updateUserAsync(newUser))
  }

  const handleAdd=(data)=>{
    const newUser={...userInfo,addresses:[...userInfo.addresses,data]}
    dispatch(updateUserAsync(newUser))
    setShowAddAddressForm(false)
  }

  const handleEditForm=(index)=>{
   setSelectedIndex(index)
   const address=userInfo.addresses[index]
   setValue("fullName",address.fullName)
   setValue("email",address.email)
   setValue("PhoneNo",address.PhoneNo)
   setValue("street",address.street)
   setValue("city",address.city)
   setValue("state",address.state)
   setValue("pinCode",address.pinCode)

   
  }
  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
         <div className=" mt-10 mx-auto max-w-7xl px-4  sm:px-6  lg:px-8" style={{backgroundColor:"#eceaea"}}>
    
 
    <div className="mt-8">
    <div className="flow-root">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
    <h1 className=" text-4xl mt-3 mb-3 font-bold leading-9 tracking-tight text-gray-900">
            Name : {userInfo.name?userInfo.name:'New User'}
          </h1>

          <h5 className=" text-3xl mt-3 mb-3 font-bold leading-9 tracking-tight text-red-900">
            Email Address : {userInfo.email}
          </h5>
          {userInfo.role==="admin" &&<h5 className=" text-3xl mt-3 mb-3 font-bold leading-9 tracking-tight text-red-900">
            Role : {userInfo.role}
          </h5>     }
      
      </div>
    </div>
  </div>

{/* // </div> */}
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >

<div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
         <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e)=>{setShowAddAddressForm(true);setSelectedIndex(-1);reset()}}  
        >
          Add Addresses
        </button>
        {showAddAddressForm  ?
    <div className='lg:col-span-3'>
         <form className='bg-white px-5 py-4 my-10' noValidate onSubmit={handleSubmit((data)=>{handleAdd(data);reset()})}>
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
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={(e)=>setShowAddAddressForm(false)}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

      
      </div>

         </form>
        </div>:null}

  <p className="mt-0.5 text-md text-gray-500">Your Addresses:</p>
  {userInfo.addresses.map((address,index)=>
  <div>
    {selectedIndex === index ?
    <div className='lg:col-span-3'>
         <form className='bg-white px-5 py-4 my-10' noValidate onSubmit={handleSubmit((data)=>{handleEdit(data)})}>
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
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={(e)=>setSelectedIndex(-1)}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Address
        </button>
      </div>

      
      </div>

         </form>
        </div>:null}
  <div key={address.fullName} className="flex justify-between gap-x-6 py-4  px-3 mb-3 " style={{border:"#cec4c4 solid 2px"}}>
            
            <div className="flex min-w-0 gap-x-4">
            
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
                <p className="text-xs leading-5 text-gray-500">{address.city}</p>
                
               </div>
              {/* <div className="mt-1 flex items-center gap-x-1.5"> */}
               {/* </div>  */}
               <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-500">{address.pinCode}</p>
               </div>
             </div>

             <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            {/* <div className="mt-1 flex items-center gap-x-1.5"> */}
              {/* <div > */}
            <button onClick={(e)=>handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  {/* </div> */}
                  {/* <div> */}
              <button onClick={(e)=>handleRemove(e,index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>    
                  {/* </div>      */}
            {/* </div> */}
              </div>     
  
          </div>
          </div>)}
  

  {/* <div className="mt-6">
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    
  </div> */}
</div>
</div>
</div>
      </div>
  );
}
