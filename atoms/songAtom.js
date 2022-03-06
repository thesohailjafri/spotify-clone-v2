import { atom } from 'recoil'

export const hoverSongState = atom({
  key: 'hoverSongState',
  default: null,
})

export const songState = atom({
  key: 'songState',
  default: {
    id: '',
    name: '',
    artists: [],
    image: '',
  },
})

export const songPlayingState = atom({
  key: 'songPlayingState',
  default: false,
})
