<script lang="ts">
  import { cn } from "$lib/utils/cn"

  export let iconOnly: boolean = false
  export let ariaLabel: string | undefined = undefined
  export let title: string | undefined = undefined
</script>

<button
  class={cn(
    iconOnly ? "p-2" : "px-2.5 py-1",
    "rounded-md bg-red-300 hover:bg-red-400"
  )}
  aria-label={ariaLabel}
  {title}
>
  <slot />
</button>
