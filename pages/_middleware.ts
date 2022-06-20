import { NextResponse, NextRequest } from "next/server";

export function middleware (req: NextRequest) {
    console.log('UA', req.headers.get('User-Agent'))

    const res = NextResponse.next()

    res.headers.set('blabla', 'true')

    return res
}