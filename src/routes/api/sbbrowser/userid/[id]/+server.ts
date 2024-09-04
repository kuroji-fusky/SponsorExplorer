import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ params }) => {
  const userid = params.id as string

  return new Response(JSON.stringify({ userid }))
}
