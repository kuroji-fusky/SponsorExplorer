"use client"

interface VideoInfoProps {
  id: string
}

export function VideoInfo(props: VideoInfoProps) {
  return (
    <div className="overflow-hidden rounded-md flex">
      <div className="aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${props.id}`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}
