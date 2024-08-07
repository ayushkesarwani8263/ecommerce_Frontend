import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrder from '../features/User/components/UserOrder'
import Footer from '../features/Common/Footer'

const UserOrderPage = () => {
  return (
    <div>
   <Navbar>
   <h1 className='mx-auto text-2xl'>My Orders</h1>
      <UserOrder></UserOrder>
   </Navbar>
   <Footer></Footer>
   </div>
  )
}

export default UserOrderPage