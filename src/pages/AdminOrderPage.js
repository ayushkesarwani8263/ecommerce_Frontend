import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrder from '../features/Admin/Component/AdminOrder'

const AdminOrderpage = () => {
  return (
    <div>
        <Navbar>
            <AdminOrder></AdminOrder>
        </Navbar>
    </div>
  )
}

export default AdminOrderpage