import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/User/components/UserProfile'
import Footer from '../features/Common/Footer'
const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
      <h1 className='mx-auto text-2xl'>My Profile</h1>
            <UserProfile></UserProfile>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default UserProfilePage