<script lang="ts">
  import { cn } from "$lib/utils/cn"

  export let iconOnly: boolean = false
  export let ariaLabel: string | undefined = undefined
</script>

<button
  class={cn(
    iconOnly ? "p-2" : "px-2.5 py-1",
    "rounded-md bg-red-200 hover:bg-red-300"
  )}
  aria-label={ariaLabel}
>
  <slot />
</button>
