import React from 'react'
import { songState, songPlayingState } from '../atoms/songAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import { toast } from 'react-toastify'
import { PlayIcon } from '@heroicons/react/solid'
export default function TrackCard({ data }) {
  const spotify = useSpotify()

  const setSong = useSetRecoilState(songState)
  const setSongPlaying = useSetRecoilState(songPlayingState)
  const playSong = () => {
    setSong({
      id: data?.id,
      name: data?.name,
      artists: data?.artists,
      image: data?.album?.images[2]?.url,
      data,
    })
    setSongPlaying(true)
    spotify
      .play({
        uris: [data.uri],
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
    <div className="card p-3" onClick={playSong}>
      <div className="relative shadow-md">
        <img src={data?.album?.images[1]?.url} alt={`${data.name} album`} />
        <PlayIcon className="btn-card " />
      </div>
      <div className="mt-3">
        <h6 className=" truncate">{data?.name}</h6>
        <p className=" truncate">By {data?.artists[0]?.name}</p>
      </div>
    </div>
  )
}
