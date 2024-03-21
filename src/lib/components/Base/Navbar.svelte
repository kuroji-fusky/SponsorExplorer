<script lang="ts">
  import { BookmarkIcon, SlidersIcon, SearchIcon } from "lucide-svelte"
  import Button from "../Button.svelte"
</script>

<nav class="px-8 flex justify-between py-4 items-center">
  <div><span class="font-bold text-xl" translate="no">SponsorExplorer</span></div>
  <div class="relative flex-shrink-0 w-96">
    <span class="absolute z-[3] left-0 inset-y-0 py-2 pl-3 pointer-events-none">
      <SearchIcon size={19} />
    </span>
    <input
      type="search"
      placeholder="Search"
      class="relative z-[2] px-9 py-2 rounded-lg border w-full border-slate-400"
    />
    <div>
      <!-- WIP auto suggest  -->
    </div>
  </div>
  <div class="flex gap-x-2">
    <Button iconOnly>
      <BookmarkIcon size={20} />
    </Button>
    <Button iconOnly>
      <SlidersIcon size={20} />
    </Button>
  </div>
</nav>
