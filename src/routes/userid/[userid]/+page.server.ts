import type { PageServerLoad } from "./$types"

export const load = (async ({ url, params }) => {
  const { userid } = url

  return {
    userid
  }
}) satisfies PageServerLoad
