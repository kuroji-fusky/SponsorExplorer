import { LockedSegmentsNotice, SegmentTable } from "@/components"
import { SegmentBadge } from "@/components/badges"
import { VideoInfo } from "@/components/headers"
import { Segments } from "@/types"
import { Responses } from "@/utils/SponsorBlock.types"
import { LuEyeOff, LuLock, LuSearch, LuTimerReset, LuX } from "react-icons/lu"

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

interface FetchFront {
  segments: Responses.SearchSegments["segments"]
  lock: {
    skip: Responses.LockCategories | never[]
    mute: Responses.LockCategories | never[]
    full: Responses.LockCategories | never[]
  }
}

export default async function VideoPage({ params }: RouteParams) {
  const segmentFetch = await fetch(
    `http://localhost:3000/api/sponsorblock/segments?id=${params.id}`
  )
  const { segments, lock } = (await segmentFetch.json()) as FetchFront

  const hasLocks = !(
    lock.skip.length === 0 &&
    lock.mute.length === 0 &&
    lock.full.length === 0
  )

  return (
    <div className="mt-4 mx-auto px-6 max-w-screen-2xl">
      <VideoInfo id={params.id} />
      <div className="my-4">{hasLocks ? <LockedSegmentsNotice /> : null}</div>
      <div className="flex flex-col gap-y-2.5">
        <div className="flex gap-x-2.5">
          <div className="p-1 rounded-md border flex">
            <button className="rounded-md px-2.5 py-1 bg-red-200 font-medium">
              All
            </button>
            <button className="rounded-md px-2.5 py-1">Segments</button>
            <button className="rounded-md px-2.5 py-1">Chapters</button>
          </div>
          <div className="flex-1 relative flex rounded-md border">
            <LuSearch size={18} className="absolute left-2 top-2.5" />
            <input
              className="flex-1 h-full ml-8"
              type="text"
              placeholder="Filter segments"
            />
          </div>
          <button>Options</button>
        </div>
        <SegmentTable segments={segments} />
        <div>
          <button>Load more...</button>
        </div>
      </div>
    </div>
  )
}
