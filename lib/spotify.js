import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-top-read',
  'user-read-playback-position',
  'user-read-private',
  'user-read-email',
  // 'playlist-modify-public',
  // 'playlist-modify-private',
  // 'playlist-read-public',
  'playlist-read-private',
  'user-library-read',
  // 'user-library-modify',
  'playlist-read-collaborative',
  // 'ugc-image-upload',
  'user-follow-read',
  // 'user-follow-modify',
  'streaming',
].join(',')

const params = {
  scope: scopes,
}

const queryString = new URLSearchParams(params).toString()

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryString}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi

export { LOGIN_URL }
