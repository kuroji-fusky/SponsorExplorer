import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = ({ url, params }) => {
  const dataParams = url.searchParams.get("data")

  return new Response(JSON.stringify({ dataParams, params }), { status: 200 })
}
