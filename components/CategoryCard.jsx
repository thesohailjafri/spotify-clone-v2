import React from 'react'
import { PlayIcon } from '@heroicons/react/solid'

export default function CategoryCard({ data }) {
  return (
    <div className="card p-3">
      <div className=" relative shadow-md">
        <img src={data?.icons[0]?.url} alt={`${data.name} album`} />
        <PlayIcon className="btn-card " />
      </div>
      <div className="mt-3">
        <h6 className=" truncate">{data?.name}</h6>
      </div>
    </div>
  )
}
