import { atom } from 'recoil'

export const hoverSongState = atom({
  key: 'hoverSong',
  default: null,
})

export const songState = atom({
  key: 'song',
  default: null,
})

export const songPlayingState = atom({
  key: 'songPlaying',
  default: false,
})
