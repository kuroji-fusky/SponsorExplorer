import type { NextResponse } from "next/server"

// Tanks to dis guy: https://www.reddit.com/r/nextjs/comments/13z9w3v/comment/jmvmccl
// biome-ignore lint/suspicious/noExplicitAny:
export type GetAPIResponseType<Endpoint extends (...args: any) => any> =
  Awaited<ReturnType<Endpoint>> extends NextResponse<infer T> ? T : never
