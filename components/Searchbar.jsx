import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '../atoms/searchAtom'
export default function Searchbar() {
  const [search, setSearch] = useRecoilState(searchState)

  return (
    <div
      id="searchbar"
      className="transition-global mx-3 mt-6 flex h-10 items-center space-x-3 overflow-hidden rounded-full bg-white px-2 md:mt-3 md:max-w-sm"
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
  )
}
