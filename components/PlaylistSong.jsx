import { format, millisecondsToMinutes } from 'date-fns'
import React from 'react'
import millisToMinutesAndSeconds from '../utils/millisToMinutesAndSeconds'
import { hoverSongState } from '../atoms/songAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { PlayIcon } from '@heroicons/react/solid'
import { songState, songPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { toast } from 'react-toastify'
export default function ({ index, track }) {
  const song = track.track
  const spotify = useSpotify()
  const [hover, setHover] = useRecoilState(hoverSongState)
  const setSong = useSetRecoilState(songState)
  const setSongPlaying = useSetRecoilState(songPlayingState)

  const playSong = () => {
    setSong({
      id: track.track.id,
      name: track.track.name,
      artists: track.track.artists,
      image: track.track.album?.images[2]?.url,
    })
    setSongPlaying(true)
    spotify
      .play({
        uris: [song.uri],
      })
      .then((res) => console.log(res))
      .catch((err) => {
        toast.error(err.body.error.message || 'Something went wrong', {
          autoClose: 3000,
          hideProgressBar: true,
        })
        console.error('Something went wrong!', { err })
      })
  }

  return (
    <div
      onMouseOver={() => setHover(song.id)}
      onMouseOut={() => setHover(null)}
      className=" duration-50 grid cursor-default grid-cols-12 gap-x-6 rounded-md  bg-neutral-900 p-1 text-neutral-300 transition-colors ease-in hover:bg-neutral-800"
    >
      <div className=" col-span-1 inline-flex items-center justify-center truncate text-right">
        {hover === song.id ? (
          <PlayIcon
            className="btn cursor-default"
            onClick={() => {
              playSong()
            }}
          />
        ) : (
          index + 1
        )}
      </div>
      <div className=" col-span-9 flex items-center justify-start  md:col-span-6 lg:col-span-4">
        <div className=" shrink-0">
          <img
            src={song?.album?.images[2]?.url}
            className="  mr-3 h-10 w-10 overflow-hidden bg-black bg-cover"
            alt=""
          />
        </div>

        <div className="truncate">
          <h6 className="truncate font-semibold text-neutral-200">
            {song?.name}
          </h6>
          <p className=" flex truncate text-sm">
            {song?.explicit && (
              <div className=" mr-2 h-4 w-4 rounded-sm bg-neutral-400 text-center text-xs text-neutral-900">
                E
              </div>
            )}
            {song?.artists.map((item) => item.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="my-auto hidden truncate md:col-span-3 md:block">
        {song.album?.name}
      </div>
      <div className="hidden truncate lg:col-span-2 lg:block">
        {format(new Date(track.added_at), 'PP')}
      </div>
      <div className=" col-span-2 my-auto truncate">
        {millisToMinutesAndSeconds(song?.duration_ms)}
      </div>
    </div>
  )
}
