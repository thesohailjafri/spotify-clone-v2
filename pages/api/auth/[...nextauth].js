import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { LOGIN_URL } from '../../../lib/spotify'

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
    signin: '/login',
  },
  callbacks: {
    async jwt(user, account, token) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }
    },
    // TODO continue here from 1.11
  },
})
