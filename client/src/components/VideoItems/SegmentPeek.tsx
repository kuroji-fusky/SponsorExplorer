"use client"

interface SegmentPeekProps {}

export function SegmentPeek(props: React.PropsWithChildren<SegmentPeekProps>) {
  return (
    <div className="dark:bg-neutral-900 bg-neutral-100 rounded-md shadow-lg w-full px-1.5 py-1">
      {props.children}
    </div>
  )
}
