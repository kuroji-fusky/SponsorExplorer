import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = ({ params }) => {
  return new Response(JSON.stringify({ userid: params.id }))
}
