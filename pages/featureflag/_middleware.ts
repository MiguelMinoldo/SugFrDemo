import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'uCountry'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  
  // Fetch user Id from the cookie if available 
  const userId = req.cookies['uId'] || crypto.randomUUID()
  const country = req.geo.country
  const newUrl = country === 'FR' ? url + '/FR' : url
  const res = NextResponse.rewrite(newUrl)

  // Add the cookie if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, country)
  }

  if (!req.cookies['uId']) {
    res.cookie('uId', userId)
  }

  return res
}
