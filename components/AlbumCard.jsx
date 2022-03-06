import Link from 'next/link'
import React from 'react'
import { PlayIcon } from '@heroicons/react/solid'

export default function AlbumCard({ data }) {
  return (
    <Link href={`/album/${data.id}`}>
      <div className="card p-3">
        <div className=" relative shadow-md">
          <img src={data?.images[1]?.url} alt={`${data.name} album`} />
          <PlayIcon className="btn-card " />
        </div>
        <div className="mt-3">
          <h6 className=" truncate">{data?.name}</h6>
          <p className=" truncate">By {data?.artists[0]?.name}</p>
        </div>
      </div>
    </Link>
  )
}
