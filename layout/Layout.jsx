import React, { useEffect, useCallback } from 'react'
import ProfileTab from '../components/ProfileTab'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'
import {
  cardCountState,
  pageOnState,
  windowWidthState,
} from '../atoms/globalAtom'
import { debounce } from 'lodash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import BottomBar from '../components/BottomBar'
import { songState } from '../atoms/songAtom'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Topbar from '../components/Topbar'
export default function Layout({ children }) {
  const router = useRouter()
  const [pageOn, setPageOn] = useRecoilState(pageOnState)
  const setWindowWidthState = useSetRecoilState(windowWidthState)
  const setCardCount = useSetRecoilState(cardCountState)
  const song = useRecoilValue(songState)
  /* recount cards */
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

  /* page link */
  useEffect(() => {
    const routesAry = router.asPath.split('/')
    if (routesAry.includes('search')) {
      setPageOn('search')
    } else {
      setPageOn('home')
    }
  }, [router.asPath])
  return (
    <div className=" flex max-h-screen min-h-screen w-full bg-neutral-900">
      <ToastContainer theme="dark" />
      <nav className="z-50 hidden min-w-[250px] max-w-xs flex-1 bg-black md:block">
        <Sidebar />
      </nav>
      <nav className=" absolute bottom-0 z-50 block h-14 w-full bg-black md:hidden">
        <BottomBar />
      </nav>
      <main className="scrollbar-hide h-screen grow overflow-y-scroll scrollbar scrollbar-thin  scrollbar-thumb-black">
        <Topbar />
        {children}
        <div className={classNames({ 'h-0': !song.id }, { 'h-20': song.id })} />
        <Player />
      </main>
    </div>
  )
}
