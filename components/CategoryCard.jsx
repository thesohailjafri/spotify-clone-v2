import React from 'react'

export default function CategoryCard({ data }) {
  return (
    <div className="card p-3">
      <div className="shadow-md">
        <img src={data?.icons[0]?.url} alt={`${data.name} album`} />
      </div>
      <div className="mt-3">
        <h6 className=" truncate">{data?.name}</h6>
      </div>
    </div>
  )
}
