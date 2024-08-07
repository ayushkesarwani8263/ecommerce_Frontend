import React from 'react'
import Navbar from '../features/Navbar/Navbar'
// import ProductDetails from '../features/ProductList/Component/ProductDetails'
import AdminProductDetails from '../features/Admin/Component/AdminProductDetails'
import Footer from '../features/Common/Footer'

const AdminProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
            <AdminProductDetails></AdminProductDetails>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default AdminProductDetailsPage