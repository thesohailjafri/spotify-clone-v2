import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useSession, signOut } from 'next-auth/react'
export default function Home() {
  const { data: session } = useSession()
  console.log({ session })
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className=" relative min-h-screen">
          <div className="absolute right-2 top-2 flex items-center space-x-2 rounded-full bg-black p-1 text-white">
            <div className=" h-10 w-10 rounded-full bg-red-400"></div>
            <div className="pr-4">{session?.user?.name}</div>
          </div>
          <main className=" bg-spotify-100 p-4 text-2xl font-bold">
            <Link href="/login">Spotify Clone v2</Link>
          </main>
        </div>
      </Layout>
    </div>
  )
}
