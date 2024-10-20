"use client"

interface VIdeoInfoProps {
  id: string
}

export function VideoInfo(props: VIdeoInfoProps) {
  return (
    <>
      <iframe src={`https://www.youtube-nocookie.com/embed/${props.id}`} className="outline-none aspect-video" width={854} height={480} />
    </>
  )
}
