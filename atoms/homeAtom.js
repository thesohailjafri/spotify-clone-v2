import { atom } from 'recoil'

export const featuredPlaylistsState = atom({
  key: 'featuredPlaylistsState',
  default: [],
})

export const newReleasesState = atom({
  key: 'newReleasesState',
  default: [],
})

export const recommendationState = atom({
  key: 'recommendationState',
  default: [],
})

export const categoriesState = atom({
  key: 'categoriesState',
  default: [],
})
