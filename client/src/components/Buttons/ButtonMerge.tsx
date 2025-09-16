import { cn } from "@/utils"

export function ButtonMerge(props: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex",
        // First
        "first:[&_button]:rounded-tr-none first:[&_button]:rounded-br-none first:[&_button]:!border-r-0",
        // Last
        "last:[&_button]:rounded-tl-none last:[&_button]:rounded-bl-none",
      )}
    >
      {props.children}
    </div>
  )
}
