import { NextRequest, NextResponse } from 'next/server'
import { getValue } from '@lib/configcat'

const COOKIE_NAME_COUNTRY = 'uCountry'
const COOKIE_NAME_UID = 'uId'
const COOKIE_NAME_SUGFR = 'sugconfr'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  
  // Fetch user Id from the cookie if available 
  const userId = req.cookies[COOKIE_NAME_UID] || crypto.randomUUID()
  const country = req.cookies[COOKIE_NAME_COUNTRY] || req.geo.country
  const sugfr = req.cookies[COOKIE_NAME_SUGFR] || (getValue(COOKIE_NAME_SUGFR) ? '1' : '0')

  const res = NextResponse.rewrite(url)
  
  // Add the cookies if those are not there
  if (!req.cookies[COOKIE_NAME_COUNTRY]) {
    res.cookie(COOKIE_NAME_COUNTRY, country)
  }

  if (!req.cookies[COOKIE_NAME_UID]) {
    res.cookie(COOKIE_NAME_UID, userId)
  }

  if (!req.cookies[COOKIE_NAME_SUGFR]) {
    res.cookie(COOKIE_NAME_SUGFR, sugfr)
  }

  return res
}