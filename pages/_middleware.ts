import { NextRequest, NextResponse } from "next/server";

export function middleware (req: NextRequest) {
    console.log('UA: ' + req.headers.get('User-Agent'))

    const res = NextResponse.next()

    res.headers.set('x-demo-this', '100')

    return res
}