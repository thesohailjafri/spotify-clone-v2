import Link from 'next/link'
import React from 'react'

export default function AlbumCard({ data }) {
  console.log(data)
  return (
    <Link href={`/album/${data.id}`}>
      <div className="card p-3">
        <div className="shadow-md">
          <img src={data?.images[1]?.url} alt={`${data.name} album`} />
        </div>
        <div className="mt-3">
          <h6 className=" truncate">{data?.name}</h6>
          <p className=" truncate">By {data?.artists[0]?.name}</p>
        </div>
      </div>
    </Link>
  )
}
