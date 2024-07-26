import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({ url }) => {
  const typeQuery = url.searchParams.get("by") as string

  const playlistIdQuery = url.searchParams.get("playlist") as string
  const channelQuery = url.searchParams.get("channel") as string

  const sbUserIdQuery = url.searchParams.get("sb-userid") as string
  const sbUserNameQuery = url.searchParams.get("sb-username") as string

  const requireParamError = (queryStr: string, byParamBypass?: boolean) => {
    if (byParamBypass) {
      error(400, {
        message: `Type query '${typeQuery}' is specified; but query param  '${queryStr}' required`
      })
    }

    error(400, {
      message: `Query param '${queryStr}' required`
    })
  }

  if (!typeQuery) {
    requireParamError("by")
  }

  if (typeQuery === "channel") {
    if (!channelQuery) requireParamError("channel", true)
  }

  if (typeQuery === "playlist") {
    if (!playlistIdQuery) requireParamError("playlist", true)
  }

  if (typeQuery === "userid") {
    if (!sbUserIdQuery) requireParamError("sb-userid", true)
  }

  if (typeQuery === "username") {
    if (!sbUserNameQuery) requireParamError("sb-username", true)
  }
}) satisfies PageServerLoad
