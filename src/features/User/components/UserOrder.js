import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrderAsync, selectUserInfoStatus, selectUserOrder } from '../userSlice'
// import selectUserOrder from "../userSlice"
import { selectUser } from '../../auth/authSlice'
import { discountPrice } from '../../../Constant'
import { Grid } from 'react-loader-spinner'
const UserOrder = () => {
    const dispatch=useDispatch();
    const user=useSelector(selectUser);
    const status=useSelector(selectUserInfoStatus)
    console.log(user.id)
    const orders=useSelector(selectUserOrder)
    useEffect(()=>{
      dispatch(fetchLoggedInUserOrderAsync())
    },[dispatch])
    return (
    <div>
      {orders && orders.map((order)=>
      <div>
         <div className=" mt-10 mx-auto max-w-7xl px-4  sm:px-6  lg:px-8" style={{backgroundColor:"#eceaea"}}>
    
 
    <div className="mt-8">
    <div className="flow-root">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
    <h1 className=" text-4xl mt-3 mb-3 font-bold leading-9 tracking-tight text-gray-900">
            Order # {order.id}
          </h1>

          <h5 className=" text-3xl mt-3 mb-3 font-bold leading-9 tracking-tight text-red-900">
            Order Status : {order.status}
          </h5>     
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {order.items.map((item) => (

          <li key={item.product.id} className="flex py-6">
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
                  <p className="ml-4">${discountPrice(item.product)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500">
                <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900 mr-2">
                  Qty:{item.quantity}
                 </label>
                 
                </div>

                <div className="flex">
                  
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
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >

<div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex  my-3 justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>${order.totalAmount}</p>
  </div>

  <div className="flex my-3 justify-between text-base font-medium text-gray-900">
    <p>Total Items In Cart</p>
    <p>{order.totalItems} Items</p>
  </div>
  <p className="mt-0.5 text-md text-gray-500">Shipping Address:</p>
  
  <div key={order.selectedAddress.fullName} className="flex justify-between gap-x-6 py-4  px-3 mb-3 " style={{border:"#cec4c4 solid 2px"}}>
            
            <div className="flex min-w-0 gap-x-4">
            
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">Name:{order.selectedAddress.fullName}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-900">PhoneNo:{order.selectedAddress.PhoneNo}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-900">State:{order.selectedAddress.state}</p>
  
              </div>
            </div>
  
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-900">address</p>
              </div>
               <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-500">{order.selectedAddress.city}</p>
               </div> 
               <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-500">{order.selectedAddress.pinCode}</p>
               </div>
             </div>
  
  
          </div>

  {/* <div className="mt-6">
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    
  </div> */}
</div>
</div>
</div>
      </div>
      )}
      {status==='loading'?<div style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Grid
                      visible={true}
                      height="80"
                      width="80"
                      color="rgb(79,70,229)"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass="grid-wrapper"
                      /></div>:null}
    </div>
    



  )
}

export default UserOrder

// export default UserOrder