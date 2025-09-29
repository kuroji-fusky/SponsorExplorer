import { cn } from "@/utils"

interface DetailPeekProps {
  header: string
  className?: string
}

export default function DetailPeek(
  props: React.PropsWithChildren<DetailPeekProps>,
) {
  return (
    <div
      data-detail-peek-container=""
      className={cn(props.className, "space-y-1")}
    >
      <div className="text-sm opacity-75">{props.header}</div>
      <div>{props.children}</div>
    </div>
  )
}
