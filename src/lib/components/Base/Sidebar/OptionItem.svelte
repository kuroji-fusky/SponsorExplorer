<script lang="ts">
  export let title: string
  export let description: string
</script>

<div class="flex my-1.5">
  <div class="flex-1">
    <h2 class="text-lg !font-semibold">{title}</h2>
    <p class="opacity-65 mt-0.5">{description}</p>
  </div>
  <span class="flex-shrink-0">
    <slot />
  </span>
</div>
