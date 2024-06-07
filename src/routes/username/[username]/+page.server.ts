import type { PageServerLoad } from "./$types"

export const load = (async ({ url, params }) => {
  const { username } = url

  return { username }
}) satisfies PageServerLoad
