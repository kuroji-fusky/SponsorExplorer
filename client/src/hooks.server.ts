import { error, redirect, type Handle } from "@sveltejs/kit"

const proxyUrl = import.meta.env.DEV ? "http://localhost:4000" : process.env.SERVER_URL

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname, search } = event.url
  const path = `${pathname}${search}`

  // Search bot things
  // Track only the landing page and nothing else mkay?
  if (path !== "/") {
    event.setHeaders({
      "X-Robots-Tag": "noindex, nofollow",
    })
  }

  // Route matching stuff
  if (path.startsWith("/v/") || path.startsWith("/video/https:")) {
    // `/video/:id` route path matching
    const match = path.match(/(?:youtu\.be\/|v=|embed|shorts|\/|v\/)([a-zA-Z0-9_-]{11})/)

    if (
      match &&
      (path.includes("youtube.com") || path.includes("youtu.be") || path.startsWith("/v/"))
    ) {
      const videoId = match[1]

      throw redirect(301, `/video/${videoId}`)
    }
  }

  const [_, ...rest] = path.split("/").filter(Boolean)

  const concatPath = rest.join("")

  if (path.startsWith("/userid")) {
    throw redirect(301, `/submissions/userid/${concatPath}`)
  }

  if (path.startsWith("/username")) {
    throw redirect(301, `/submissions/username/${concatPath}`)
  }

  const res = await resolve(event)

  try {
    // Check if proxy server is alive
    // TODO to prevent from each pings on every page request, limit it per 5-10 minute cooldown
    const proxyServer = await fetch(`${proxyUrl}/ping`)

    console.log(await proxyServer.json())
  } catch (e) {
    const err = e as Error

    console.error("Proxy server errored, returned:", (err as Error).message)
    console.error("You might need to run the proxy server first lol")

    throw error(500, `Proxy server not running, returned: ${(err as Error).message}`)
  }

  return res
}
