import React, { useEffect, useState } from 'react'
import { UpdateOrdersAsync, fetchAllOrdersAsync, selectOrders, selectTotalOrders,selectOrderStatus } from '../../order/orderSlice'
import { ITEM_PER_PAGE, discountPrice } from "../../../Constant";
import { useSelector, useDispatch } from "react-redux";
import {EyeIcon,PencilIcon,ArrowDownIcon,ArrowUpIcon} from "@heroicons/react/20/solid";
import Pagination from '../../Common/Pagination';
import { Grid } from 'react-loader-spinner';

const AdminOrder = () => {
  const [page,setPage]=useState(1)
  const orders=useSelector(selectOrders)
  const totalOrders=useSelector(selectTotalOrders)
  const dispatch=useDispatch()
  const [editableOrderId,setEditableOrderId]=useState(-1)
  const [sort,setSort]=useState({})
  const status=useSelector(selectOrderStatus)


const PageHandler=(page)=>{
  setPage(page)
  // const pagination={_page:page,_limit:ITEM_PER_PAGE}
    // dispatch(fetchAllOrdersAsync({pagination}))
}    

function sortHandler(option){
  const test={_sort:option.sort,_order:option.order}
   setSort(test)
}

  useEffect(()=>{
    const pagination={_page:page,_limit:ITEM_PER_PAGE}
    dispatch(fetchAllOrdersAsync({sort,pagination}))
    // alert("hlw")
  },[dispatch,page,sort])

  const handleEdit=(order)=>{
    setEditableOrderId(order.id)
  }
  const handleShow=()=>{
    console.log("handleShow")
  }
  
  const handleUpdate=(e,Order)=>{
    const order={...Order,status:e.target.value}
    dispatch(UpdateOrdersAsync(order))
    setEditableOrderId(-1)
  }


  const chooseColor=(status)=>{
    switch(status){
      case "pending":
        return 'bg-purple-200 text-purple-600'
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600'
      case 'delivered':
        return 'bg-green-200 text-green-600'
      case 'cancel':
        return 'bg-red-200 text-red-600'
      default :
      return 'bg-purple-200 text-purple-600'        
    }
  }

  return (
    // <div>
      <>
    {/* component */}
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
          {status==='loading'?<div style={{marginTop:'10px',display:"flex",justifyContent:"center",alignItems:"center"}}><Grid
                      visible={true}
                      height="80"
                      width="80"
                      color="rgb(79,70,229)"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass="grid-wrapper"
                      /></div>:null}
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={()=>sortHandler({sort:'id',order:sort?._order==='asc'?'desc':'asc',})}>ORDER# {' '}{sort._sort==='id' && (sort._order==='asc'?<ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>:<ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>)}</th>
                  <th className="py-3 px-6 text-left">ITEM</th>
                  <th className="py-3 px-6 text-center cursor-pointer" onClick={()=>sortHandler({sort:'totalAmount',order:sort?._order==='asc'?'desc':'asc',})}>TOTAL AMOUNT {' '}{sort._sort==='totalAmount' && (sort._order==='asc'?<ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>:<ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>)}</th>
                  <th className="py-3 px-6 text-center">SHIPPING ADDRESS</th>
                  <th className="py-3 px-6 text-center">STATUS</th>
                  <th className="py-3 px-6 text-center">PAYMENT METHOD</th>
                  <th className="py-3 px-6 text-center">ACTIONS</th>
                </tr>
              </thead>
              
<tbody className="text-gray-600 text-sm font-light">
              
                {orders.map(order=>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                      </div>
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                     {/* {order.items} */}
                    {order.items.map(item=>(
                    <div className="flex items-center">
                      <div className="mr-2 my-1">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={item.product.thumbnail}
                          alt={item.product.title}
                        />
                      </div>
                      <span>{item.product.title} - #{item.quantity} - ${discountPrice(item.product )}</span>
                    </div>))}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                      ${order.totalAmount}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="">
                      <div><strong>{order.selectedAddress.fullName},</strong></div>
                      <div>{order.selectedAddress.street},</div>
                      <div>{order.selectedAddress.city},</div>
                      <div>{order.selectedAddress.state},</div>
                      <div>{order.selectedAddress.pinCode},</div>
                      <div>{order.selectedAddress.phoneNo},</div>
                      


                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {editableOrderId === order.id ?
                    <select onChange={(e)=>handleUpdate(e,order)}>
                      <option value="pending">pending</option>
                      <option value="dispatched">dispatched</option>
                      <option value="delivered">delivered</option>
                      <option value="cancel">cancel</option>

                    </select>:
                    
                    <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                      {order.status}
                    </span>
                    }
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                      ${order.selectedPayment}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 ml-4 transform hover:text-purple-500 hover:scale-110">
                        <EyeIcon className='w-8 h-8'onClick={()=>handleShow()}></EyeIcon>
                      </div>
                      <div className="w-6 ml-5 transform hover:text-purple-500 hover:scale-110">
                      <PencilIcon className='w-8 h-8' onClick={()=>handleEdit(order)}></PencilIcon>
                      </div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                        
                      </div>
                    </div>
                  </td>
                  </tr>
            )
                
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination page={page} setPage={setPage} PageHandler={PageHandler} totalItems={totalOrders}></Pagination>
    </div>
  </>
  // </div>
  )
}

export default AdminOrder