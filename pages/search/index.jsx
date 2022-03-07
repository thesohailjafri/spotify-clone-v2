import { SearchIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchState } from '../../atoms/searchAtom'
import useSpotify from '../../hooks/useSpotify'
import {
  romancePlaylistsState,
  indianPlaylistsState,
  hiphopPlaylistsState,
  rockPlaylistsState,
} from '../../atoms/searchAtom'
import { useSession } from 'next-auth/react'
import { cardCountState } from '../../atoms/globalAtom'
import TrackCard from '../../components/TrackCard'
import PlaylistCard from '../../components/PlaylistCard'
import Link from 'next/link'
import PlaylistSearchCard from '../../components/PlaylistSearchCard'
export default function Searchbar() {
  const spotify = useSpotify()
  const { data: session } = useSession()
  const cardCount = useRecoilValue(cardCountState)

  const router = useRouter()
  const [search, setSearch] = useRecoilState(searchState)

  const [romancePlaylists, setRomancePlaylists] = useRecoilState(
    romancePlaylistsState
  )
  const [indianPlaylists, setIndianPlaylists] =
    useRecoilState(indianPlaylistsState)
  const [hiphopPlaylists, setHiphopPlaylists] =
    useRecoilState(hiphopPlaylistsState)
  const [rockPlaylists, setRockPlaylists] = useRecoilState(rockPlaylistsState)

  /* searchbar */
  useEffect(() => {
    if (router.query.q) {
      setSearch(router.query.q)
    }
  }, [router.query])
  useEffect(() => {
    if (search) {
      router.push(`/search?q=${search}`)
    } else {
      router.push('/search')
    }
  }, [search])

  /* fetch index data */
  // useEffect(() => {
  //   if (spotify.getAccessToken()) {
  //     spotify
  //       .searchPlaylists('romance', { limit: 8, country: 'IN' })
  //       .then((data) => {
  //         console.log(data.body.playlists.items)
  //         setRomancePlaylists(data.body.playlists.items)
  //       })
  //       .catch((err) => {
  //         console.log('Something went wrong!', err)
  //       })

  //     spotify
  //       .searchPlaylists('indian', { limit: 8, country: 'IN' })
  //       .then((data) => {
  //         setIndianPlaylists(data.body.playlists.items)
  //       })
  //       .catch((err) => {
  //         console.log('Something went wrong!', err)
  //       })

  //     spotify
  //       .searchPlaylists('hiphop', { limit: 8, country: 'IN' })
  //       .then((data) => {
  //         setHiphopPlaylists(data.body.playlists.items)
  //       })
  //       .catch((err) => {
  //         console.log('Something went wrong!', err)
  //       })

  //     spotify
  //       .searchPlaylists('rock', { limit: 8, country: 'IN' })
  //       .then((data) => {
  //         setRockPlaylists(data.body.playlists.items)
  //       })
  //       .catch((err) => {
  //         console.log('Something went wrong!', err)
  //       })
  //   }
  // }, [spotify, session])
  return (
    <div className="">
      <div
        id="searchbar"
        className="transition-global m-3 flex h-10 items-center space-x-3 overflow-hidden rounded-full bg-white px-2  md:max-w-sm"
      >
        <SearchIcon className=" h-7 w-7 shrink-0 text-black" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Artist, song or podcast"
          className=" appearance-none text-sm font-semibold text-black focus:outline-none"
        />
      </div>
      <div>
        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Romance</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className=" card-grid">
            {romancePlaylists?.slice(0, cardCount).map((item) => (
              <PlaylistSearchCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Indian</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className=" card-grid">
            {indianPlaylists?.slice(0, cardCount).map((item) => (
              <PlaylistSearchCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Hiphop</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className=" card-grid">
            {hiphopPlaylists?.slice(0, cardCount).map((item) => (
              <PlaylistSearchCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Rock</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className=" card-grid">
            {rockPlaylists?.slice(0, cardCount).map((item) => (
              <PlaylistSearchCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
