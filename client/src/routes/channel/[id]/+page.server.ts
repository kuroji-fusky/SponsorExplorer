import type { ChannelResponse } from "$lib/types/proxy-api"

export const load = async ({ params }) => {
  const { id } = params

  const req = await fetch(`http://localhost:4000/channel/${id}?bypass_cache=true`)
  const data = (await req.json()) as ChannelResponse

  return data
}
