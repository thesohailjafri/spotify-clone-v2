import React from 'react'
import {
  HomeIcon as HomeIconOl,
  SearchIcon as SearchIconOl,
  CollectionIcon as CollectionIconOl,
  PlusSmIcon as PlusIconOl,
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconSl } from '@heroicons/react/solid'

import Image from 'next/image'

// array of 20 playlist names
const playlistNames = [
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
  'Discover Weekly',
]

export default function Sidebar() {
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
        <li className="flex items-center space-x-4">
          <HomeIconOl className="btn" />
          <span>Home</span>
        </li>
        <li className="flex items-center space-x-4">
          <SearchIconOl className="btn" />
          <span>Search</span>
        </li>
        <li className="flex items-center space-x-4">
          <CollectionIconOl className="btn" />
          <span>Your Library</span>
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
      <ul className=" overflow-y-scroll">
        {playlistNames.map((playlistName, index) => (
          <li key={index} className="flex items-center space-x-4">
            <span className="">{playlistName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
