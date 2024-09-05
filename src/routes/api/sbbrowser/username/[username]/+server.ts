import type { RequestHandler } from "@sveltejs/kit"
import fetchSBbrowser from "$lib/utils/fetchSBbrowser"

export const GET: RequestHandler = async ({ params }) => {
  const decodeUsername = decodeURIComponent(params.username!)

  try {
    const { reqUrl, segments, updateTime } = await fetchSBbrowser(
      "username",
      decodeUsername
    )

    const finalData = segments.map((row) => {
      // prettier-ignore
      const [date, id, start, end, length, votes, views, category, shadowhidden, uuid, action, hidden, userid] = row

      return {
        date,
        id,
        start,
        end,
        length,
        votes,
        views,
        category,
        shadowhidden,
        uuid,
        action,
        hidden,
        userid
      }
    })

    return new Response(
      JSON.stringify({
        reqUrl,
        updateTime,
        segments: finalData
      })
    )
  } catch (e) {
    const { code, status } = e

    return new Response(
      JSON.stringify({
        message: "Username not found",
        code
      }),
      { status }
    )
  }
}
