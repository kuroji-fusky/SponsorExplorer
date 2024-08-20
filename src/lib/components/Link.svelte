<script lang="ts">
  import { cn } from "$lib/utils"

  export let href: string
  export let external: boolean = false
  export let title: string = ""
</script>

<a
  {...$$props}
  {href}
  {title}
  target={external ? "_blank" : undefined}
  rel={external ? "noopenner noreferrer" : undefined}
  class={cn("text-blue-400 hover:text-blue-500 hover:underline", $$props.class)}
>
  <slot />
</a>
