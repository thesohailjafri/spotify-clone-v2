import { atom } from 'recoil'

export const albumState = atom({
  key: 'albumState',
  default: null,
})

export const albumIdState = atom({
  key: 'albumIdState',
  default: '',
})
