import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME_COUNTRY = 'uCountry'
const COOKIE_NAME_UID = 'uId'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  
  // Fetch user Id from the cookie if available 
  const userId = req.cookies[COOKIE_NAME_UID] || crypto.randomUUID()
  const country = req.cookies[COOKIE_NAME_COUNTRY] || req.geo.country
  const res = NextResponse.rewrite(url)

  console.log('User ID is: ', userId)

  res.headers.set('x-user-id', userId)

  // Add the cookies if those are not there
  if (!req.cookies[COOKIE_NAME_COUNTRY]) {
    res.cookie(COOKIE_NAME_COUNTRY, country)
  }

  if (!req.cookies[COOKIE_NAME_UID]) {
    res.cookie(COOKIE_NAME_UID, userId)
  }

  return res
}