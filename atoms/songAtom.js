import { atom } from 'recoil'

export const hoverSongState = atom({
  key: 'hoverSongState',
  default: null,
})

export const songState = atom({
  key: 'songState',
  default: null,
})

export const songPlayingState = atom({
  key: 'songPlayingState',
  default: false,
})
