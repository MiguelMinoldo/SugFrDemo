import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'flag-frenchUser'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  
  // Fetch user Id from the cookie if available 
  const userId = req.cookies['uId'] || crypto.randomUUID()
    
  //const sugconfr = useValue('sugconfr', false, userId, req.geo.city)
  
  //console.log("sugconfr: " + sugconfr);
  
  //const cookie = req.cookies[COOKIE_NAME] || (sugconfr ? '1' : '0')

  const res = NextResponse.rewrite(url)

  // Add the cookie if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, req.geo.country)
  }

  if (!req.cookies['uId']) {
    res.cookie('uId', userId)
  }

  return res
}
