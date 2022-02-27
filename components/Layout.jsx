import React, { useEffect, useCallback } from 'react'
import ProfileTab from './ProfileTab'
import Sidebar from './Sidebar'
import Player from './Player'
import { cardCountState, windowWidthState } from '../atoms/globalAtom'
import { debounce } from 'lodash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSetRecoilState } from 'recoil'
export default function Layout({ children }) {
  const setWindowWidthState = useSetRecoilState(windowWidthState)
  const setCardCount = useSetRecoilState(cardCountState)
  const setWindowWidthDebounched = useCallback(
    debounce(() => {
      const width = window.innerWidth
      const calculateCardCount = (width) => {
        let count
        if (width < 768) {
          count = 2
        } else if (width < 1024) {
          count = 3
        } else if (width < 1280) {
          count = 4
        } else if (width < 1536) {
          count = 5
        } else {
          count = 7
        }
        return count
      }
      setCardCount(calculateCardCount(width))
      setWindowWidthState(width)
    }, 100),
    []
  )

  useEffect(() => {
    setWindowWidthDebounched()
  }, [])
  useEffect(() => {
    window.addEventListener('resize', setWindowWidthDebounched, false)
  }, [])
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
