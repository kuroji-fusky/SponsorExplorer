"use client"

import { useRouter } from "next/navigation"

export const usePrefetchRoute = (page: string) => {
  const router = useRouter()

  return () => router.prefetch(page)
}
