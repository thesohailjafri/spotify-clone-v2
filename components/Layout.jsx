import React from 'react'
import Sidebar from './Sidebar'
export default function Layout({ children }) {
  return (
    <div
      className=" flex min-h-screen w-full
  bg-neutral-900
  "
    >
      <nav className="hidden max-w-xs flex-1 bg-black md:block">
        <Sidebar />
      </nav>
      <main className="grow">{children}</main>
    </div>
  )
}
