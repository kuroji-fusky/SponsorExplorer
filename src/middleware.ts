import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = `
    script-src 'self' 'unsafe-eval' 'nonce-${nonce}';
    connect-src 'self' https://youtube.googleapis.com;
    frame-src https://www.youtube-nocookie.com;
    upgrade-insecure-requests;
  `

  const parsedCsp = csp.replace(/\s{2,}/g, " ").trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("Content-Security-Policy", parsedCsp)
  requestHeaders.set("x-nonce", nonce)

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  res.headers.set("Content-Security-Policy", parsedCsp)

  return res
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
