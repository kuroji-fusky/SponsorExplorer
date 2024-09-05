import { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
  const req = await fetch("https://sb.ltn.fi/database/vipUsers.csv")
  const rawText = await req.text()

  const parsedData = rawText.split("\n").slice(1, -1)

  return new Response(JSON.stringify(parsedData))
}
