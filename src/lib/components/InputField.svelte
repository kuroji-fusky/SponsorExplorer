<script lang="ts">
  import type { ComponentType } from "svelte"
  import type { Icon } from "lucide-svelte"
  import SearchIcon from "lucide-svelte/icons/search"

  export let icon: ComponentType<Icon> = SearchIcon
  export let inputField: HTMLInputElement | null = null
  export let placeholder: string = "Filter segments"
</script>

<div class="relative flex-shrink-0 max-w-[32rem] w-full">
  <span
    class="absolute z-[3] left-0 inset-y-0 py-2 pl-3 grid place-items-center pointer-events-none"
  >
    <svelte:component this={icon} size={18} />
  </span>
  <input
    bind:this={inputField}
    {placeholder}
    type="text"
    class="relative z-[2] px-9 py-2 rounded-lg border w-full border-neutral-400 bg-neutral-900"
  />
  <div class="absolute top-10 inset-x-0 empty:hidden">
    <slot name="results" />
  </div>
</div>
