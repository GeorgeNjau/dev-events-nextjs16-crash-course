import { NextResponse } from 'next/server'

export async function proxy(req) {
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/ingest')) {
        const url = new URL(pathname.replace('/ingest', ''), process.env.NEXT_PUBLIC_POSTHOG_HOST)
        url.search = req.nextUrl.search

        return NextResponse.rewrite(url)
    }
}

export const config = {
    matcher: '/ingest/:path*',
}