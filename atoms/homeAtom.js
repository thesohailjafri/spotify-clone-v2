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

export const top3ArtistsState = atom({
  key: 'top3ArtistsState',
  default: [],
})

export const firstArtistPlaylistsState = atom({
  key: 'firstArtistPlaylistsState',
  default: {
    name: '',
    tracks: [],
  },
})

export const secondArtistPlaylistsState = atom({
  key: 'secondArtistPlaylistsState',
  default: { name: '', tracks: [] },
})

export const thridArtistPlaylistsState = atom({
  key: 'thridArtistPlaylistsState',
  default: { name: '', tracks: [] },
})
