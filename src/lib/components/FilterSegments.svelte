<script>
  import FilterIcon from "lucide-svelte/icons/filter"
  import HelpCircleIcon from "lucide-svelte/icons/circle-help"
  import Button from "./Button.svelte"
</script>

<div class="flex gap-x-2 mb-3">
  <div
    class="flex flex-shrink-0 gap-x-0.5
    [&_button]:px-2 [&_button]:border-b-2 [&_button]:border-b-neutral-300 [&_button]:text-neutral-300
     hover:[&_button:not([disabled])]:text-white
    [&_button[disabled]]:opacity-50 [&_button[disabled]]:cursor-not-allowed [&_button[disabled]]:border-b-transparent
     [&_button.active]:border-b-red-600 [&_button.active]:text-white [&_button.active]:font-semibold"
  >
    <!-- TODO convert this into a combobox on mobile viewport -->
    <button class="active">Segments</button>
    <button disabled>Chapters</button>
  </div>
  <div class="relative flex-1">
    <span class="absolute z-[3] left-0 inset-y-0 py-2 pl-3 pointer-events-none">
      <FilterIcon size={18} />
    </span>
    <input
      type="text"
      name="Filter segments"
      placeholder="Filter segments"
      id="filter-segments"
      class="py-1 pl-9 pr-3 rounded-md bg-neutral-900 border border-neutral-500 w-full h-full"
    />
  </div>
  <Button iconOnly>
    <HelpCircleIcon size={18} />
  </Button>
</div>
