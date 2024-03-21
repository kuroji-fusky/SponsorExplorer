<script lang="ts">
  export let href: string
  export let external: boolean = false
</script>

<a
  {href}
  target={external ? "_blank" : undefined}
  rel={external ? "noopenner noreferrer" : undefined}
  class="text-blue-500 hover:text-blue-600 hover:underline"
>
  <slot />
</a>
