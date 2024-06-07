<script lang="ts">
  import CopyIcon from "lucide-svelte/icons/copy"

  export const overrideField: string = ""
</script>

<div class="flex">
  <slot />
  <div>
    <CopyIcon />
  </div>
</div>
