<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  import { cva, type VariantProps } from "class-variance-authority";

  const baseBtn = cva(null, {
    variants: {
      variant: {
        primary: "border-transparent dark:bg-neutral-700 hover:dark:bg-neutral-700/60 bg-neutral-200",
        secondary:
          "dark:border-neutral-500/50 border-neutral-400/50 hover:dark:border-neutral-400/60 hover:border-neutral-600/60",
        tritery: "border-transparent hover:bg-neutral-400/20",
      },
      size: {
        skinny: "[--btn-size:0]",
        smol: "[--btn-size:1.33]",
        big: "[--btn-size:2.5]",
      },
    },
    compoundVariants: [{ variant: "primary", size: "smol" }],
  });

  interface Props extends Omit<HTMLButtonAttributes, "prefix">, VariantProps<typeof baseBtn> {
    icon?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
    href?: string;
  }

  const {
    icon,
    href,
    prefix,
    suffix,
    children,
    variant = "primary",
    size = "smol",
    class: _class,
    ...others
  }: Props = $props();
</script>

<svelte:element
  this={href ? "a" : "button"}
  {href}
  target={href ? "_blank" : undefined}
  class={twMerge(
    baseBtn({ size, variant }),
    icon
      ? "p-[calc(var(--spacing)*calc(var(--btn-size)+.4))]"
      : "py-[calc(var(--spacing)*var(--btn-size))] px-[calc(var(--spacing)*calc(var(--btn-size)+1))]",
    prefix || suffix ? "inline-flex" : "inline-block",
    "select-none rounded-sm border items-center gap-x-1.5",
    _class as string,
  )}
  {...others}
>
  {@render prefix?.()}
  {@render children?.()}
  {@render suffix?.()}
</svelte:element>
