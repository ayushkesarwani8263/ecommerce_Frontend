import React from 'react'
import Navbar from '../features/Navbar/Navbar'
// import ProductList from '../features/ProductList/Component/ProductList'
import AdminProductList from '../features/Admin/Component/AdminProductList'
import Footer from '../features/Common/Footer'

const AdminHome = () => {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default AdminHome