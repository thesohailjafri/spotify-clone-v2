import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
export default function Login({ providers }) {
  console.log(Object.values(providers))
  return (
    <div className=" grid min-h-screen w-screen place-content-center bg-neutral-900">
      <div className="">
        <Image
          src="/assets/images/spotify-logo.svg"
          alt="logo"
          width={500}
          height={200}
          className="mx-auto"
        />
        <div className="grid justify-center text-white">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded bg-spotify-100 py-3 px-4 font-bold text-white transition-all
              duration-300 ease-out hover:bg-spotify-200"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
              >
                Login with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
