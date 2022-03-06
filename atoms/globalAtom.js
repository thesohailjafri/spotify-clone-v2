import { atom } from 'recoil'

export const windowWidthState = atom({
  key: 'windowWidthState',
  default: 0,
})

export const cardCountState = atom({
  key: 'cardCountState',
  default: 2,
})

export const sidebarActive = atom({
  key: 'sidebarActive',
  default: '/',
})

export const pageOnState = atom({
  key: 'pageOnState',
  default: 'home',
})
