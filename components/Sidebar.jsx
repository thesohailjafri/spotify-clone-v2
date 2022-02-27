import React, { useEffect, useState } from 'react'
import {
  HomeIcon as HomeIconOl,
  SearchIcon as SearchIconOl,
  CollectionIcon as CollectionIconOl,
  PlusSmIcon as PlusIconOl,
  LogoutIcon as LogoutIconOl,
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconSl } from '@heroicons/react/solid'

import Image from 'next/image'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import Link from 'next/link'
export default function Sidebar() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const spotify = useSpotify()

  useEffect(() => {
    if (spotify.getAccessToken()) {
      spotify.getUserPlaylists().then((res) => {
        if (res && res.statusCode === 200) {
          setPlaylists([...res.body.items])
        }
      })
    }
  }, [spotify, session])

  return (
    <div className="max-h-screen flex-col space-y-4 px-6 text-lg text-white text-opacity-75 md:flex">
      {/* logo */}
      <div className="mt-2">
        <Image
          src="/assets/images/spotify-logo.svg"
          layout="responsive"
          width={300}
          height={80}
        />
      </div>
      {/* main nav */}
      <ul className=" space-y-4 font-bold">
        <Link href="/">
          <li className="flex items-center space-x-4">
            <HomeIconOl className="btn" />
            <span>Home</span>
          </li>
        </Link>
        <Link href="/search">
          <li className="flex items-center space-x-4">
            <SearchIconOl className="btn" />
            <span>Search</span>
          </li>
        </Link>
        <li className="flex items-center space-x-4">
          <CollectionIconOl className="btn" />
          <span>Your Library</span>
        </li>
        <li className="flex items-center space-x-4">
          <LogoutIconOl className="btn" />
          <span>Logout</span>
        </li>
      </ul>
      {/* space */}
      <div className=" h-2" />
      {/* util */}
      <ul className=" space-y-4 font-bold">
        <li className="flex items-center space-x-4">
          <PlusIconOl className="btn bg-neutral-400 p-1 text-black" />
          <span>Create Playlist</span>
        </li>
        <li className="flex items-center space-x-4">
          <HeartIconSl className="btn bg-gradient-to-br from-blue-600 to-fuchsia-400 p-1" />
          <span>Liked Songs</span>
        </li>
      </ul>
      <hr className=" opacity-50" />
      {/* playlists */}
      <ul className=" space-y-2 overflow-y-auto ">
        {playlists.map((playlist) => (
          <Link href={`/playlist/${playlist.id}`}>
            <li
              onClick={() => setPlaylistId(playlist.id)}
              key={playlist?.id}
              className="flex cursor-pointer items-center space-x-4 text-sm font-semibold  opacity-75 transition-opacity duration-100 ease-in-out hover:opacity-100"
            >
              <span className=" truncate">{playlist?.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
