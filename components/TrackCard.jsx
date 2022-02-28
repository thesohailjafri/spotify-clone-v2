import React from 'react'

export default function TrackCard({ data }) {
  return (
    <div className="card p-3">
      <div className="shadow-md">
        <img src={data?.album?.images[1]?.url} alt={`${data.name} album`} />
      </div>
      <div className="mt-3">
        <h6 className=" truncate">{data?.name}</h6>
        <p className=" truncate">By {data?.artists[0]?.name}</p>
      </div>
    </div>
  )
}