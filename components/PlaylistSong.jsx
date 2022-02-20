import { format, millisecondsToMinutes } from 'date-fns'
import React from 'react'
import millisToMinutesAndSeconds from '../utils/millisToMinutesAndSeconds'

export default function ({ index, track }) {
  const song = track.track
  return (
    <div className=" duration-50 grid grid-cols-12 gap-x-6 rounded-md  bg-neutral-900 p-1 text-neutral-300 transition-colors ease-in hover:bg-neutral-800">
      <div className=" col-span-1 inline-flex items-center justify-end truncate text-right">
        {index + 1}
      </div>
      <div className=" col-span-9 flex items-center  md:col-span-6 lg:col-span-4">
        <img
          src={song?.album?.images[2]?.url}
          className=" mr-3 h-10 w-10 overflow-hidden bg-black bg-cover"
          alt=""
        />
        <div className="truncate">
          <div className=" font-semibold text-neutral-200">{song?.name}</div>
          <div className=" text flex text-sm">
            {song?.explicit && (
              <div className=" mr-2 h-4 w-4 rounded-sm bg-neutral-400 text-center text-xs text-neutral-900">
                E
              </div>
            )}
            {song?.artists.map((item) => item.name).join(', ')}
          </div>
        </div>
      </div>
      <div className="hidden truncate md:col-span-3 md:block">
        {song.album?.name}
      </div>
      <div className="hidden truncate lg:col-span-2 lg:block">
        {format(new Date(track.added_at), 'PP')}
      </div>
      <div className=" col-span-2 truncate">
        {millisToMinutesAndSeconds(song?.duration_ms)}
      </div>
    </div>
  )
}
