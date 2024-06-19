<script lang="ts">
  import { cn } from "$lib/utils"

  export let iconOnly: boolean = false
  export let ariaLabel: string | undefined = undefined
  export let title: string | undefined = undefined
  export let clickEvent = () => {}

  let className: string = ""
  export { className as class }
</script>

<button
  {title}
  class={cn(
    iconOnly ? "p-2" : "px-2.5 py-1",
    "rounded-md bg-red-900 hover:bg-red-950",
    className
  )}
  aria-label={ariaLabel}
  on:click={clickEvent}
>
  <slot />
</button>
