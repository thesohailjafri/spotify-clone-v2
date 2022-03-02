import React, { useEffect, useCallback } from 'react'
import ProfileTab from './ProfileTab'
import Sidebar from './Sidebar'
import Player from './Player'
import { cardCountState, windowWidthState } from '../atoms/globalAtom'
import { debounce } from 'lodash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSetRecoilState } from 'recoil'
import BottomBar from './BottomBar'
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
        } else if (width < 2000) {
          count = 7
        } else {
          count = 8
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
      <nav className="b absolute bottom-0 block h-14 w-full bg-black md:hidden">
        <BottomBar />
      </nav>
      <main className="scrollbar-hide h-screen grow overflow-y-scroll scrollbar scrollbar-thin  scrollbar-thumb-black">
        <ProfileTab />
        {children}
        <Player />
      </main>
    </div>
  )
}
