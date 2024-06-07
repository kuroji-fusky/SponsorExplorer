import type { PageServerLoad } from "./$types"

export const load = (async ({ url, params }) => {
  const { id } = url

  return {
    id,
    playlistName: ""
  }
}) satisfies PageServerLoad
