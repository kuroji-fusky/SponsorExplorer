<script lang="ts">
  import { cn } from "$lib/utils/cn"

  let className: string = ""
  export { className as class }
</script>

<div class={cn("px-3 py-[0.175rem] rounded-md overflow-hidden", className)}>
  <slot />
</div>
