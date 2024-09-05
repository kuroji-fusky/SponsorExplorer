import type { RequestHandler } from "@sveltejs/kit"
import { youtube } from "@googleapis/youtube"
import { parseDateStr, ytApiKey as key } from "$lib/utils"

export const GET: RequestHandler = async ({ url, params }) => {
  const dataParams = url.searchParams.get("data")
  const includeChannelDetails =
    url.searchParams.get("includeChannelDetails") === "1"

  const videoId = params.video!

  const _yt = youtube("v3")
  const videoReq = await _yt.videos.list(
    {
      key,
      id: [videoId],
      part: ["snippet"]
    },
    {
      headers: {
        "cache-control": "public, max-age=1800"
      }
    }
  )

  const {
    data: { items: videoDetails }
  } = videoReq

  // Check if it's a valid youtube video, throw 400 otherwise
  if (videoDetails!.length == 0)
    return new Response(
      JSON.stringify({
        dataParams,
        message: `Video ID "${videoId}" has found nothing from the API response; check your URL as it could either be mistyped, deleted, set to private, or non-existent.`
      }),
      {
        status: 404
      }
    )

  return new Response(
    JSON.stringify({
      dataParams,
      response: "ok"
    }),
    {
      status: 200
    }
  )
}
