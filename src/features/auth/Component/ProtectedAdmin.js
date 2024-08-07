import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../User/userSlice'

const ProtectedAdmin = ({children}) => {
    const user=useSelector(selectUser)
    const userInfo=useSelector(selectUserInfo)
if(!user){
return <Navigate to="/login" replace={true}></Navigate>
}
if(user && userInfo.role!== "admin"){
return <Navigate to="/" replace={true}></Navigate>

}
return children

}

export default ProtectedAdmin