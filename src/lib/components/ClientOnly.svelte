<script lang="ts">
  import { dev } from "$app/environment"
</script>

{#if dev}
  <slot />
{/if}
