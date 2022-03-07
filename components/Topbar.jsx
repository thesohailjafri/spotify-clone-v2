import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React from 'react'
import ProfileTab from './ProfileTab'

export default function Topbar() {
  return (
    <div className=" sticky top-0 z-40 flex items-center justify-between bg-neutral-900 bg-opacity-80 p-3">
      <NextPrevBtns />
      <ProfileTab />
    </div>
  )
}

const NextPrevBtns = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="btn">
        <ChevronLeftIcon className=" h-9 w-9 scale-100  transform rounded-full bg-black bg-opacity-70 p-2 transition duration-100 ease-out hover:scale-110" />
      </button>
      <button className="btn">
        <ChevronRightIcon className=" hover:scale-1101 h-9 w-9  scale-100 transform rounded-full bg-black bg-opacity-70 p-2 transition duration-100 ease-out" />
      </button>
    </div>
  )
}
