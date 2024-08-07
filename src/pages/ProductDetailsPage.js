import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/ProductList/Component/ProductDetails'
import Footer from '../features/Common/Footer'

const ProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetails></ProductDetails>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default ProductDetailsPage