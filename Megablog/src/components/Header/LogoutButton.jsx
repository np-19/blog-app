import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { logout } from '../../features/auth/authSlice'  

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    authService.logout().then(() => {
        dispatch(logout());
    });
  }

  return (
    <div>
      <button 
      className='inline-block px-6 py-2 duration-300 hover:bg-red-50 hover:text-red-600 text-gray-700 font-medium rounded-full transition-all'
       onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton
