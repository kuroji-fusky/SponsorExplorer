import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ url }) => {
  const sbUserNameQuery = url.searchParams.get("username") as string
  const sbUserIdQuery = url.searchParams.get("userid") as string

  if (sbUserIdQuery && sbUserNameQuery) {
    error(500, {
      message:
        "Both `username` and `userid` queries can't be used at the same time to avoid conflicts"
    })
  }

  // TODO add cheerio scraper for sb.ltn.fi

  return {
    sbUserIdQuery,
    sbUserNameQuery
  }
}) satisfies PageServerLoad
