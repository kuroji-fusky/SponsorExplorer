import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname, search } = event.url
  const path = `${pathname}${search}`

  // `/video/:id` route path matching
  if (path.startsWith("/v/") || path.startsWith("/video/https:")) {
    const match = path.match(/(?:youtu\.be\/|v=|embed\/|v\/)([a-zA-Z0-9_-]{11})/)

    if (
      match &&
      (path.includes("youtube.com") || path.includes("youtu.be") || path.startsWith("/v/"))
    ) {
      const videoId = match[1]

      throw redirect(301, `/video/${videoId}`)
    }
  }

  const res = await resolve(event)
  return res
}
