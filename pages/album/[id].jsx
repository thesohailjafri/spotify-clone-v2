import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseInt, shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSpotify from '../../hooks/useSpotify'
import { useRouter } from 'next/router'
import { format, secondsToHours, secondsToMinutes } from 'date-fns'
import { PlayIcon, PauseIcon, DotsHorizontalIcon } from '@heroicons/react/solid'
import { ClockIcon, MusicNoteIcon } from '@heroicons/react/solid'
import { albumIdState, albumState } from '../../atoms/albumAtom'
import AlbumSong from '../../components/AlbumSong'
export default function Main() {
  const router = useRouter()
  const { id } = router.query
  const [album, setAlbum] = useRecoilState(albumState)
  const spotify = useSpotify()
  const fetchData = () => {
    if (spotify.getAccessToken()) {
      spotify
        .getAlbum(id)
        .then((res) => {
          let duration = res.body.tracks.items.reduce(
            (prev, current) => prev + current.duration_ms / 1000,
            0
          )

          res.body.durationInHour = secondsToHours(duration)
          !res.body.durationInHour &&
            (res.body.durationInMinutes = secondsToMinutes(duration))
          res.body.totalSongs = res.body.tracks.items.length

          console.log(duration)
          setAlbum(res.body)
        })
        .catch((err) => {
          router.replace('/notfound')
        })
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
  useEffect(() => {
    fetchData()
  }, [])

  const albumId = useRecoilValue(albumIdState)
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
  }, [albumId])

  return (
    <main className=" overflow-y-auto">
      <section
        className={`h-56 w-full bg-gradient-to-b md:h-80 ${color[0]} ${color[1]} flex items-end`}
      >
        <div className="m-6 flex items-center justify-start gap-6 md:items-end">
          <div className="">
            {album?.images[0]?.url ? (
              <div
                className="h-28 w-28 overflow-hidden bg-cover bg-center shadow-2xl md:h-48 md:w-48"
                style={{
                  backgroundImage: `url(${album?.images[0]?.url})`,
                }}
              />
            ) : (
              <div className="grid h-28 w-28 place-items-center overflow-hidden bg-neutral-800 bg-cover bg-center shadow-2xl md:h-48 md:w-48">
                <MusicNoteIcon className="h-20 w-20 text-neutral-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-end gap-2 md:gap-3">
            <span className="text-sm font-bold uppercase">{album?.type}</span>
            <h2 className=" text-4xl font-bold md:text-5xl lg:text-6xl">
              {album?.name}
            </h2>
            <div>
              <span className=" font-semibold">
                {album?.tracks?.items[0]?.artists[0]?.name}
              </span>{' '}
              |{' '}
              <span className="text-sm">
                {album?.release_date &&
                  format(new Date(album?.release_date), 'Y')}
              </span>{' '}
              |{' '}
              <span className="text-sm">
                {album?.totalSongs} {album?.totalSongs > 1 ? 'Songs' : 'Song'}
              </span>{' '}
              |{' '}
              <span className="text-sm text-neutral-300">
                About{' '}
                {album?.durationInHour
                  ? album?.durationInHour + ' hours'
                  : album?.durationInMinutes + ' minutes'}
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
            <div className=" col-span-9 ">title</div>
            <div className=" col-span-2">
              <ClockIcon className="btn-sm" />
            </div>
          </div>

          <hr className="mt-3 mb-5 opacity-50" />
          <div className="space-y-2 ">
            {album?.tracks?.items.map((item, index) => (
              <AlbumSong
                track={item}
                index={index}
                key={item.id}
                album={album}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
