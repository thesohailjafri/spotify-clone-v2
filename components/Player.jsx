import React from 'react'
import {
  HeartIcon as HeartIconSolid,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  RewindIcon,
} from '@heroicons/react/solid'
import {
  HeartIcon as HeartIconOutline,
  SwitchHorizontalIcon,
  RefreshIcon,
} from '@heroicons/react/outline'

export default function Player() {
  return (
    <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-between gap-3 bg-neutral-800 p-4 text-neutral-300">
      <div className="flex items-center gap-3 ">
        <img
          src=""
          alt=""
          className="h-14 w-14 shrink-0 overflow-hidden bg-black bg-cover"
        />
        <div>
          <h6 className="text-neutral-200">Song Name</h6>
          <p className="text-sm text-neutral-300">Artist Name</p>
        </div>
        <HeartIconOutline className="btn-sm " />
      </div>
      <div className=" flex items-center justify-center gap-3">
        <SwitchHorizontalIcon className="btn text-neutral-400" />
        <RewindIcon className="btn" />
        <PlayIcon className="btn h-11 w-11 text-neutral-50" />
        <FastForwardIcon className="btn" />
        <RefreshIcon className="btn text-neutral-400" />
      </div>
      <div className=""></div>
    </div>
  )
}
