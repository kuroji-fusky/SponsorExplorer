<script lang="ts">
  import { cn } from "$lib/utils"

  export let iconOnly: boolean = false
  export let ariaLabel: string | undefined = undefined
  export let title: string | undefined = undefined
  export let clickEvent = () => {}
  export let disabled

  let className: string = ""
  export { className as class }
</script>

<button
  {title}
  {disabled}
  class={cn(
    iconOnly ? "p-2" : "px-2.5 py-1",
    "rounded-md bg-red-900 hover:bg-red-950 disabled:bg-neutral-700 disabled:opacity-75 disabled:cursor-not-allowed",
    className
  )}
  aria-label={ariaLabel}
  on:click={clickEvent}
>
  <slot />
</button>
