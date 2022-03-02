import Link from 'next/link'
import React from 'react'
import {
  HomeIcon as HomeIconOl,
  SearchIcon as SearchIconOl,
  CollectionIcon as CollectionIconOl,
  PlusSmIcon as PlusIconOl,
  LogoutIcon as LogoutIconOl,
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconSl } from '@heroicons/react/solid'
export default function BottomBar() {
  return (
    <ul className=" grid h-full grid-cols-4 gap-x-4 px-1">
      <Link href="/">
        <li className=" grid place-items-center">
          <HomeIconOl className="btn" />
        </li>
      </Link>
      <Link href="/search">
        <li className="grid place-items-center ">
          <SearchIconOl className="btn" />
        </li>
      </Link>
      <li className="grid place-items-center ">
        <CollectionIconOl className="btn" />
      </li>
      <li className="grid place-items-center ">
        <LogoutIconOl className="btn" />
      </li>
    </ul>
  )
}
