import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/outline'
export default function ProfileTab() {
  const { data: session } = useSession()

  return (
    <div
      onClick={signOut}
      className="absolute right-2 top-2 flex cursor-pointer items-center space-x-2 rounded-full bg-neutral-800 p-1 text-white"
    >
      {session?.user?.picture ? (
        <img
          className=" btn rounded-full bg-neutral-400"
          src={session?.user?.picture}
        />
      ) : (
        <div className="">
          <UserIcon className="btn rounded-full bg-neutral-500 p-1" />
        </div>
      )}
      <div className="flex items-center pr-4 font-bold">
        <span>{session?.user?.name}</span>
        <span>
          <ChevronDownIcon className="btn h-5" />
        </span>
      </div>
    </div>
  )
}
