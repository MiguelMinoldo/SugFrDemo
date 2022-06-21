import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log('UA', req.headers.get('User-Agent'))

    const res = NextResponse.next()

    res.headers.set('sometinhg', 'as')

    return res
}