import { atom } from 'recoil'

export const searchState = atom({
  key: 'searchState',
  default: '',
})

export const romancePlaylistsState = atom({
  key: 'romancePlaylistsState',
  default: [],
})

export const indianPlaylistsState = atom({
  key: 'indianPlaylistsState',
  default: [],
})

export const hiphopPlaylistsState = atom({
  key: 'hiphopPlaylistsState',
  default: [],
})

export const rockPlaylistsState = atom({
  key: 'rockPlaylistsState',
  default: [],
})
