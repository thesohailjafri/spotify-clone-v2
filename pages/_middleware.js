import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  console.log('middleware')
  //token willl exist if user id logged in
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET })
  const { pathname } = req.nextUrl

  // if token is valid or path is /login or /signup let them go
  if (token || pathname.includes('/api/auth')) {
    return NextResponse.next()
  }
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
