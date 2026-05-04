import type { VideoResponse } from "$lib/types/proxy-api"
import type { LayoutServerLoad } from "./$types"

export const load = (async ({ params }) => {
  const { id } = params

  const req = await fetch(`http://localhost:4000/video/${id}?bypass_cache=true`)
  const data = (await req.json()) as VideoResponse

  return data
}) satisfies LayoutServerLoad
