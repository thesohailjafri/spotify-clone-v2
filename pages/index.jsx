import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-spotify-100 p-4 text-2xl font-bold">
        Spotify Clone v2
      </main>
    </div>
  )
}
