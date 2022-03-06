import '../styles/util.scss'
import '../styles/globals.scss'

import Layout from '../layout/Layout'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (router.pathname === '/login') {
    return <Component {...pageProps} />
  }
  return (
    <SessionProvider>
      <Head>
        <link rel="icon" href="/spotify.ico" />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
