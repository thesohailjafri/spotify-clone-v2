import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ProfileTab from '../components/ProfileTab'
import {
  featuredPlaylistsState,
  newReleasesState,
  recommendationState,
  categoriesState,
} from '../atoms/homeAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import HomeHeadCard from '../components/HomeHeadCard'
import AlbumCard from '../components/AlbumCard'
import { cardCountState } from '../atoms/globalAtom'
import { useState } from 'react'
import TrackCard from '../components/TrackCard'
import CategoryCard from '../components/CategoryCard'

export default function Home() {
  const spotify = useSpotify()
  const { data: session } = useSession()
  const cardCount = useRecoilValue(cardCountState)
  const [featuredPlaylists, setFeaturedPlaylists] = useRecoilState(
    featuredPlaylistsState
  )
  const [newReleases, setNewReleases] = useRecoilState(newReleasesState)
  const [recommendations, setRecommendation] =
    useRecoilState(recommendationState)
  const [categories, setCategories] = useRecoilState(categoriesState)
  useEffect(() => {
    if (spotify.getAccessToken()) {
      if (featuredPlaylists.length === 0) {
        spotify
          .getFeaturedPlaylists({ limit: 6, country: 'IN' })
          .then((data) => {
            setFeaturedPlaylists(data?.body?.playlists?.items)
          })
          .catch((err) => console.error('getFeaturedPlaylists', err))
      }

      if (newReleases.length === 0) {
        spotify
          .getNewReleases({ limit: 8, country: 'IN' })
          .then((data) => {
            setNewReleases(data?.body?.albums?.items)
          })
          .catch((err) => console.error('getNewReleases', err))
      }

      if (recommendations.length === 0) {
        spotify
          .getMyTopArtists({
            limit: 3,
          })
          .then((data) => {
            spotify
              .getRecommendations({
                min_energy: 0.7,
                seed_artists: data?.body?.items?.map((item) => item.id) || [
                  '1Xyo4u8uXC1ZmMpatF05PJ',
                ],
                limit: 8,
                min_popularity: 70,
              })
              .then((data) => {
                setRecommendation(data?.body?.tracks)
              })
              .catch((err) => console.error('getRecommendations', err))
          })
          .catch((err) => console.error('getMyTopArtists', err))
      }

      if (categories.length === 0) {
        spotify
          .getCategories({
            limit: 7,
            offset: 0,
            country: 'IN',
          })
          .then((data) => {
            setCategories(data?.body?.categories?.items)
          })
          .catch((err) => console.error('getCategories', err))
      }
    }
  }, [spotify, session])

  const greetings = () => {
    let myDate = new Date()
    let hrs = myDate.getHours()
    let mins = myDate.getMinutes()
    let greet
    if (hrs >= 5 && ((hrs == 5 && mins >= 30) || (hrs > 5 && hrs < 12)))
      greet = 'Good Morning'
    else if (hrs >= 12 && hrs < 18) greet = 'Good Afternoon'
    else if ((hrs >= 18 && hrs < 24) || hrs > 0) greet = 'Good Evening'
    else greet = 'Greetings'
    return greet
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid gap-y-6 p-3">
        {/* featured */}
        <div className="">
          <h3 className=" my-6 text-xl font-bold lg:text-3xl">
            {greetings()}
            {session?.user?.name ? `, ${session?.user?.name}` : ''}
          </h3>
          <div className=" grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredPlaylists.map((item) => (
              <HomeHeadCard key={item.id} data={item} />
            ))}
          </div>
        </div>
        {/* recommendtions */}
        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Recommendations</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-8">
            {recommendations.slice(0, cardCount).map((item) => (
              <TrackCard key={item.id} data={item} />
            ))}
          </div>
        </div>
        {/* new release */}
        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">New Release</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-8">
            {newReleases.slice(0, cardCount).map((item) => (
              <AlbumCard key={item.id} data={item} />
            ))}
          </div>
        </div>
        {/* categories */}
        <div>
          <div className="mb-3 flex items-end  justify-between">
            <h4 className=" text-2xl font-bold">Categories</h4>
            <Link href="/search">
              <span className="see-all">See All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 3xl:grid-cols-8">
            {categories.slice(0, cardCount).map((item) => (
              <CategoryCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
