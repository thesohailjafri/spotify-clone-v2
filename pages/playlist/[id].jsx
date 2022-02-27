import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseInt, shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../../atoms/playlistAtom'
import useSpotify from '../../hooks/useSpotify'
import { useRouter } from 'next/router'
import { secondsToHours, secondsToMinutes } from 'date-fns'
import { PlayIcon, PauseIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { ClockIcon } from '@heroicons/react/outline'
import PlaylistSong from '../../components/PlaylistSong'

export default function Main() {
  const router = useRouter()
  const { id } = router.query

  const spotify = useSpotify()
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await spotify.getPlaylist(id)
      if (res && res.statusCode === 200) {
        let duration = res.body.tracks.items.reduce(
          (prev, current) => prev + current.track.duration_ms / 1000,
          0
        )
        res.body.durationInHour = secondsToHours(duration)
        !res.body.durationInHour &&
          (res.body.durationInMinutes = secondsToMinutes(duration))
        res.body.totalSongs = res.body.tracks.items.length

        console.log('reduce', res.body.totalSongs)
        setPlaylist(res.body)
      }
    }
    if (spotify.getAccessToken()) {
      fetchPlaylist()
    }
  }, [id])

  const playlistId = useRecoilValue(playlistIdState)
  const colors = [
    ['from-blue-400', 'to-blue-800'],
    ['from-red-400', 'to-red-800'],
    ['from-sky-400', 'to-sky-800'],
    ['from-violet-400', 'to-violet-800'],
    ['from-indigo-400', 'to-indigo-800'],
    ['from-purple-400', 'to-purple-800'],
    ['from-fuchsia-400', 'to-fuchsia-800'],
    ['from-pink-400', 'to-pink-800'],
    ['from-orange-400', 'to-orange-800'],
    ['from-amber-400', 'to-amber-800'],
  ]
  const [color, setColor] = useState(colors[0])
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  return (
    <main className=" overflow-y-auto">
      <section
        className={` h-80 w-full bg-gradient-to-b ${color[0]} ${color[1]} flex items-end`}
      >
        <div className="m-6 flex items-end justify-start gap-6">
          <div className="">
            <div
              className="h-48 w-48 overflow-hidden bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage: `url(${playlist?.images[0]?.url})`,
              }}
            />
          </div>
          <div className="flex flex-col justify-end gap-3">
            <span className="text-sm font-bold uppercase">
              {playlist?.type}
            </span>
            <h2 className=" text-4xl font-bold md:text-5xl lg:text-6xl">
              {playlist?.name}
            </h2>
            <div>
              <span className=" font-semibold">
                {playlist?.owner?.display_name}
              </span>{' '}
              |{' '}
              <span className="text-sm">
                {playlist?.totalSongs}{' '}
                {playlist?.totalSongs > 1 ? 'Songs' : 'Song'}
              </span>{' '}
              |{' '}
              <span className="text-sm">
                {playlist?.followers?.total}{' '}
                {playlist?.followers?.total?.length > 1
                  ? 'Followers'
                  : 'Follower'}
              </span>{' '}
              |{' '}
              <span className="text-sm">
                About{' '}
                {playlist?.durationInHour
                  ? playlist?.durationInHour + ' hours'
                  : playlist?.durationInMinutes + ' minutes'}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className=" p-3">
        <div className="mb-3 flex items-center gap-6">
          <button>
            <PlayIcon className="btn-lg text-spotify-200" />
          </button>
          <DotsHorizontalIcon className="btn text-white" />
        </div>
        <div className="">
          <div className="grid grid-cols-12 gap-x-6 font-semibold uppercase text-neutral-400">
            <div className=" col-span-1 text-center">#</div>
            <div className=" col-span-9 md:col-span-6 lg:col-span-4">title</div>
            <div className="hidden md:col-span-3 md:block">album</div>
            <div className="hidden lg:col-span-2 lg:block">date added</div>
            <div className=" col-span-2">
              <ClockIcon className="btn-sm" />
            </div>
          </div>

          <hr className="mt-3 mb-5 opacity-50" />
          <div className="space-y-2 ">
            {playlist?.tracks?.items.map((item, index) => (
              <PlaylistSong track={item} index={index} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
