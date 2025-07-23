"use client"

import { IconWrapper } from "../IconWrapper"
import { cn } from "@/utils"
import type { SharedButtonProps } from "./Button.types"

type PickedButtonProps = Pick<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "className" | "aria-label" | "aria-labelledby" | "onClick"
>

export function Button(
  props: React.PropsWithChildren<SharedButtonProps> & PickedButtonProps,
) {
  const sizes: Record<NonNullable<(typeof props)["size"]>, string> = {
    smol: !props.iconOnly ? "py-1.5 px-2 gap-x-1" : "p-1.5",
    normal: !props.iconOnly ? "py-2 px-3 gap-x-1.5" : "p-2",
  }

  return (
    <button
      data-testid="button"
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      onClick={props.onClick}
      className={cn(
        "inline-flex items-center rounded-md",
        sizes[props.size ?? "normal"],
        !props.borderless ? "border se-border-1" : undefined,
        props.className,
      )}
    >
      {props.prefixIcon ? <IconWrapper icon={props.prefixIcon} /> : null}
      <span className="flex-1 text-left truncate">{props.children}</span>
      {props.suffixIcon ? <IconWrapper icon={props.suffixIcon} /> : null}
    </button>
  )
}
