<script lang="ts">
  import { CopyIcon } from "lucide-svelte"

  export let overrideField: string
</script>

<div class="flex">
  <slot />
  <div>
    <CopyIcon />
  </div>
</div>
