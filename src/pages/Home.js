import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/ProductList/Component/ProductList'
import Footer from '../features/Common/Footer'

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default Home