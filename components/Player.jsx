import React, { useCallback, useEffect, useState } from 'react'
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
  MinusCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { songState } from '../atoms/songAtom'
import debounce from 'lodash/debounce'
import classNames from 'classnames'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { toast } from 'react-toastify'
export default function Player() {
  const spotify = useSpotify()
  const [track, setTrack] = useRecoilState(songState)
  const song = track?.track
  const [volume, setVolume] = useState(50)

  const setVolumnDebounced = useCallback(
    debounce((volume) => {
      console.log(volume)
      spotify
        .setVolume(volume)
        .then((res) => console.log(res))
        .catch((err) => {
          toast.error(err.body.error.message || 'Something went wrong', {
            autoClose: 3000,
            hideProgressBar: true,
          })
          console.error(err)
        })
    }, 300),
    []
  )

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      setVolumnDebounced(volume)
    }
  }, [volume])

  return (
    <div
      className={classNames(
        `absolute bottom-0 left-0
         grid w-full grid-cols-2 items-center justify-between 
         gap-3 overflow-hidden bg-neutral-800
          px-4 text-neutral-100 
          transition-['height'] duration-300  ease-out md:grid-cols-3`,
        {
          'h-20': song,
          'h-0': !song,
        }
      )}
    >
      <div className="flex items-center gap-3 ">
        <img
          src={song?.album?.images[2]?.url}
          alt=""
          className="h-14 w-14 shrink-0 overflow-hidden bg-black bg-cover"
        />
        <div className="truncate">
          <h6 className=" text-neutral-100">{song?.name}</h6>
          <p className="max-w-xs text-xs text-neutral-300">
            {song?.artists.map((item) => item.name).join(', ')}
          </p>
        </div>
        {/* <HeartIconOutline className="btn-sm " /> */}
      </div>
      <div className=" flex items-center justify-center gap-3">
        <SwitchHorizontalIcon className="btn text-neutral-400" />
        <RewindIcon className="btn" />
        <PlayIcon className="btn h-11 w-11 text-neutral-50" />
        <FastForwardIcon className="btn" />
        <RefreshIcon className="btn text-neutral-400" />
      </div>
      <div className="vol-controller">
        <MinusCircleIcon
          className="btn-sm "
          onClick={() => {
            if (volume <= 10) {
              setVolume(0)
            } else {
              setVolume((ps) => ps - 10)
            }
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <PlusCircleIcon
          className="btn-sm"
          onClick={() => {
            if (volume >= 90) {
              setVolume(100)
            } else {
              setVolume((ps) => ps + 10)
            }
          }}
        />
      </div>
    </div>
  )
}