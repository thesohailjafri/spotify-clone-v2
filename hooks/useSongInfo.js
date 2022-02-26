import React from 'react'
import useSpotify from './useSpotify'
import { songState } from '../atoms/songAtom'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { useEffect } from 'react'
export default function useSongInfo() {
  const spotify = useSpotify()
  const song = useRecoilValue(songState)
  const [songInfo, setSongInfo] = useState()
  useEffect(() => {
    const fetchSong = async () => {
      const res = await fetch(
        `https://api.spotify.com/v1/tracks/${song.track.id}`,
        {
          headers: {
            Authorization: `Bearer ${spotify.getAccessToken()}`,
          },
        }
      ).then((res) => res.json())
      setSongInfo(res)
    }
    if (song) fetchSong()
  }, [song, spotify])

  return songInfo
}
