import React from 'react'
import ProfileTab from './ProfileTab'
import Sidebar from './Sidebar'
import Player from './Player'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Layout({ children }) {
  return (
    <div
      className=" flex max-h-screen min-h-screen w-full
  bg-neutral-900 
  "
    >
      <ToastContainer theme="dark" />
      <nav className="hidden min-w-[250px] max-w-xs flex-1 bg-black md:block">
        <Sidebar />
      </nav>
      <main className="scrollbar-hide h-screen grow overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-black  scrollbar-thumb-spotify-200">
        <ProfileTab />
        {children}
      </main>
      <Player />
    </div>
  )
}
