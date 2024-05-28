import React from 'react'
import logo from '../assets/logo.png'
import profileImg from '../assets/profile.png'


const NavBar = () => {
  return (
    <nav className='p-5 flexBetween bg-white py-2 ring-1 ring-slate-900/5 relative'>
        <div> <img src={logo} alt="" height={100} width={100}/></div>
        <div className='uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 
        max-xs:bold max-xs:px-1'>Admin Panel</div>
        <div><img src={profileImg} alt="" className='h-12 w-12 rounded-full'/></div>
    </nav>
  )
}

export default NavBar 