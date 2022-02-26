import '../styles/globals.scss'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (router.pathname === '/login') {
    return <Component {...pageProps} />
  }
  return (
    <SessionProvider>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
