import { NextRequest, NextResponse } from "next/server"

interface RouteParams {
  params: {
    uuid: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  // TODO add support for multi uuids
  const segmentUUID = params.uuid

  return NextResponse.json({ msg: "Hello from server" })
}
