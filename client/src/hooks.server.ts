import { redirect, type Handle } from "@sveltejs/kit"

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

  // Check if proxy server is alive

  const res = await resolve(event)
  return res
}
