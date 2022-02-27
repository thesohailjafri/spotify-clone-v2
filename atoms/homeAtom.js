import { atom } from 'recoil'

export const featuredPlaylistsState = atom({
  key: 'featuredPlaylistsState',
  default: [],
})

export const newReleasesState = atom({
  key: 'newReleasesState',
  default: [],
})
