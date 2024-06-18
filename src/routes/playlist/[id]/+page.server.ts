import type { PageServerLoad } from "./$types"
import { ytApiKey } from "$lib/utils"
import { error } from "@sveltejs/kit"

export const load = (async ({ url, params }) => {
  const { id } = url

  if (!ytApiKey) {
    error(500, { message: "YouTube API key missing or undefined." })
  }

  return {
    id,
    playlistName: ""
  }
}) satisfies PageServerLoad
