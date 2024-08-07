import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { SignOutAsync } from '../authSlice'

const LogOut = () => {
    const dispatch=useDispatch()
    const user=useSelector(selectUser)
    useEffect(()=>{
     dispatch(SignOutAsync())
    },[])
  return (
    <>
{!user && <Navigate to='/' replace={true}></Navigate>}
</>
     )

}

export default LogOut