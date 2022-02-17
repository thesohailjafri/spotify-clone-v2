import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { shuffle } from 'lodash'

export default function Main() {
  const colors = [
    ['from-blue-300', 'to-blue-600'],
    ['from-red-300', 'to-red-600'],
    ['from-sky-300', 'to-sky-600'],
    ['from-violet-300', 'to-violet-600'],
    ['from-indigo-300', 'to-indigo-600'],
    ['from-purple-300', 'to-purple-600'],
    ['from-fuchsia-300', 'to-fuchsia-600'],
    ['from-pink-300', 'to-pink-600'],
    ['from-orange-300', 'to-orange-600'],
    ['from-amber-300', 'to-amber-600'],
  ]
  const [color, setColor] = useState(colors[0])
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <main>
      <section
        className={` h-80 w-full bg-gradient-to-b ${color[0]} ${color[1]}`}
      ></section>
    </main>
  )
}
