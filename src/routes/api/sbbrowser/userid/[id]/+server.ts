import type { RequestHandler } from "@sveltejs/kit"
import fetchSBbrowser from "$lib/utils/fetchSBbrowser"

export const GET: RequestHandler = async ({ params }) => {
  const userid = params.id as string

  try {
    const { reqUrl, segments, updateTime } = await fetchSBbrowser(
      "userid",
      userid
    )

    const finalData = segments.map((row) => {
      // prettier-ignore
      const [date, id, start, end, length, votes, views, category, shadowhidden, uuid, action, hidden] = row

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
        hidden
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
        message: "UserID not found/invalid",
        code
      }),
      { status }
    )
  }
}
