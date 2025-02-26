import { cn } from "@/utils"

export function ButtonMerge(props: { children: React.ReactNode }) {
  return (
    <div
      data-kuro-button-merge-container=""
      className={cn(
        "inline-flex",
        // First
        "data-[kuro-button]:first:*:rounded-tr-none data-[kuro-button]:first:*:rounded-br-none data-[kuro-button]:first:*:!border-r-0",
        // Last
        "data-[kuro-button]:last:*:rounded-tl-none data-[kuro-button]:last:*:rounded-bl-none",
      )}
    >
      {props.children}
    </div>
  )
}
