import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ProfileTab from '../components/ProfileTab'
import { useSession, signOut } from 'next-auth/react'
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" relative min-h-screen"></div>
    </div>
  )
}
