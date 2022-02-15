import { log } from 'console'
import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'
// FIXME - accessTokenExpires is undefined
async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // +1 hr from expiration
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'REFRESH_TOKEN_ERROR',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),

    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        // console.log({ account, user })
        token.accessToken = account.refresh_token
        token.accessToken = account.access_token
        token.username = account.providerAccountId
        token.accessTokenExpires = account.expires_at * 1000
        //we are handling times in ms hence we x 1000 to convert to seconds
        return token
      }

      if (Date.now() < token.accessTokenExpires) {
        // console.log('token not expired')
        return token
      }

      // console.log('token expired')
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username
      return session
    },
  },
})

// callbacks: {
//   async jwt(user, account, token) {
//     if (account && user) {
//       console.log('jwt', user, account, token)
//       return {
//         ...token,
//         accessToken: account.access_token,
//         refreshToken: account.refresh_token,
//         username: account.providerAccountId,
//         accessTokenExpires: account.expires_at * 1000,
//         //we are handling times in ms hence we x 1000 to convert to seconds
//       }
//     }
//     //return token if not expired
//     if (Date.now() < token.accessTokenExpires) {
//       console.log('token not expired')
//       return token
//     }
//     //token is expired, refresh it
//     console.log('token expired')
//     return await refreshAccessToken(token)
//   },
//   async session({ session, token }) {
//     session.user.accessToken = token.accessToken
//     session.user.refreshToken = token.refreshToken
//     session.user.username = token.username
//     return session
//   },
// },
