import { LuLock, LuMoreVertical, LuSparkles } from "react-icons/lu"
import type { SharedVideoItemProps } from "./VideoItem.types"
import Link from "next/link"

interface VideoItemGridProps extends SharedVideoItemProps {
  thumbnail?: string
}

export default function VideoItemGrid(props: VideoItemGridProps) {
  const videoIdLink = `/video/${props.id}`
  return (
    <div className="relative py-2.5 px-3 flex flex-col gap-y-2 lg:gap-y-2.5 group">
      <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 -z-10 rounded-md transition duration-300 ease-in-out opacity-0 scale-90 group-hover:opacity-60 group-hover:scale-100" />
      {/* Thumbnail wrapper */}
      <Link
        className="relative aspect-video w-full rounded-md overflow-hidden"
        href={videoIdLink}
      >
        {/* Thumbnail */}
        <img src={props.thumbnail} className="size-full object-cover" alt="" />
        {/* Lock and full segments */}
        {/* <span className="absolute inline-flex top-2 left-2 rounded-md overflow-hidden *:px-1.5 *:py-0.5">
          <div className="bg-yellow-300 dark:bg-yellow-400 dark:text-black grid place-items-center">
            <LuLock size={16} />
          </div>
          <span className="font-semibold bg-sb-sponsor">Sponsor</span>
        </span> */}
        {/* Video duration */}
        {/* <div className="absolute flex items-center bottom-2.5 right-2 px-1.5 *:px-0.5 *:py-1 overflow-hidden text-white bg-black/30 rounded-md">
          <div id="og-duration">12:34</div>
          <div id="sb-deduct">(12:34)</div>
        </div> */}
        {/* Bar wrapper */}
        <div className="absolute bottom-0 inset-x-0"></div>
      </Link>
      <div className="space-y-1.5">
        <div className="flex">
          <Link
            className="flex-1 font-bold text-lg lg:text-xl"
            href={videoIdLink}
          >
            {props.title}
          </Link>
          <button className="flex-shrink-0 p-1">
            <LuMoreVertical size={18} />
          </button>
        </div>
        <span className="inline-flex gap-x-2 gap-y-2">
          <span>{props.date}</span>
          <span>N segments + Highlight</span>
        </span>
      </div>
    </div>
  )
}
