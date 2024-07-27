<script lang="ts">
  export let href: string
  export let external: boolean = false
  export let title: string = ""
</script>

<a
  {href}
  {title}
  target={external ? "_blank" : undefined}
  rel={external ? "noopenner noreferrer" : undefined}
  class="text-blue-400 hover:text-blue-500 hover:underline"
>
  <slot />
</a>
