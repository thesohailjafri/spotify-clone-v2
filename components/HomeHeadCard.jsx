import { PlayIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'

export default function HomeHeadCard({ data }) {
  return (
    <Link href={`/playlist/${data.id}`}>
      <div
        className=" group flex h-20 cursor-pointer items-center overflow-hidden rounded-md bg-neutral-600 bg-opacity-40
    shadow-sm transition-all duration-200 ease-out hover:bg-opacity-80
    "
      >
        <img
          src={data?.images[0]?.url}
          alt={data?.name}
          className="h-20 shadow-md"
        />
        <div className="flex grow items-center justify-between p-3">
          <h5 className=" text-md  font-bold">{data?.name}</h5>
          <PlayIcon className="btn-md overflow-hidden rounded-full text-spotify-200 opacity-0 shadow-md transition-all duration-200 ease-out group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  )
}
