import React from 'react'
import { Outlet } from 'react-router-dom'
import ravenWhite from '../../assets/raven_white.png'

const NavBar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 
                      flex items-center justify-between
                      pr-6 py-4
                      bg-black/40 backdrop-blur-md">

        <img
          src={ravenWhite}
          alt="Raven logo"
          className="h-20 "
        />

        <button
          className="px-5 py-2 rounded-lg 
                     font-semibold text-lg
                     bg-white text-black
                     hover:bg-white/90 transition"
        >
          Login
        </button>
      </div>

      <Outlet />
    </>
  )
}

export default NavBar
