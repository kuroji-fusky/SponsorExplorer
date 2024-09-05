import type { RequestHandler } from "@sveltejs/kit"
import { SB_AJAY_BASE_URL } from "$lib/constants"

export const GET: RequestHandler = async ({ url, params }) => {
  const uid = params.uid!

  try {
    const userStatsReq = await fetch(
      `${SB_AJAY_BASE_URL}/userInfo?publicUserID=${uid}`
    )

    if (userStatsReq.status === 404)
      return new Response(
        JSON.stringify({
          message: `Can't find user ID '${uid}' on SponsorBlock's servers.`
        }),
        {
          status: 404
        }
      )

    const userStatsRes = await userStatsReq.json()

    return new Response(
      JSON.stringify({
        query: uid,
        stats: userStatsRes
      }),
      {
        status: 200
      }
    )
  } catch (e) {
    return new Response(JSON.stringify({ query: uid, stats: {}, errors: e }), {
      status: 400
    })
  }
}
