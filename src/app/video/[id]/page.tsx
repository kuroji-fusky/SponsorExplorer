import { VideoInfo } from "@/components/headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import type { VideoSegments } from "@/types"

interface RouteParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RouteParams) {
  return {
    title: `Segments from ${params.id}`,
    description: `Submissions by user id ${params.id}`,
  }
}

export default async function VideoPage({ params }: RouteParams) {
  const segmentFetch = await fetch(
    `http://localhost:3000/api/sponsorblock/segments?id=${params.id}`
  )
  const { segments, lock } = (await segmentFetch.json()) as VideoSegments

  const hasLocks = !(
    lock.skip.length === 0 &&
    lock.mute.length === 0 &&
    lock.full.length === 0
  )

  return (
    <div className="mt-4 mx-auto px-6 max-w-screen-2xl">
      <VideoInfo id={params.id} />
      <SegmentClientWrapper hasLocks={hasLocks} segments={segments} />
    </div>
  )
}
