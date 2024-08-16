import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = ({ params }) => {
  const decodeUsername = decodeURIComponent(params.username!)

  return new Response(JSON.stringify({ username: decodeUsername }))
}
