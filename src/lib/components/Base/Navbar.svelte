<script lang="ts">
  import { onMount } from "svelte"
  import BookmarkIcon from "lucide-svelte/icons/bookmark"
  import SearchIcon from "lucide-svelte/icons/search"
  import SettingsIcon from "lucide-svelte/icons/settings"

  import Button from "../Button.svelte"
  import Watchlist from "./Sidebar/Watchlist.svelte"
  import Options from "./Sidebar/Options.svelte"
  import { optionToggle, watchlistToggle } from "$lib/stores"

  let suggestionField = false
  let searchInput: HTMLInputElement | null

  onMount(() => {
    const suggestion = {
      show: () => (suggestionField = true),
      hide: () => (suggestionField = false)
    }
  })
</script>

<nav
  class="px-8 flex justify-between py-4 items-center sticky top-0 bg-slate-50 z-10"
>
  <a href="/"
    ><span class="font-bold text-xl" translate="no">SponsorExplorer</span></a
  >
  <div class="relative flex-shrink-0 w-[32rem]">
    <span class="absolute z-[3] left-0 inset-y-0 py-2 pl-3 pointer-events-none">
      <SearchIcon size={19} />
    </span>
    <input
      bind:this={searchInput}
      role="searchbox"
      type="text"
      placeholder="Search"
      class="relative z-[2] px-9 py-2 rounded-lg border w-full border-slate-400"
    />
    <div>
      <!-- WIP auto suggest  -->
    </div>
  </div>
  <div class="flex gap-x-1">
    <Button iconOnly title="Watchlist" clickEvent={watchlistToggle.toggleState}>
      <BookmarkIcon size={20} />
    </Button>
    <Button iconOnly title="Options" clickEvent={optionToggle.toggleState}>
      <SettingsIcon size={20} />
    </Button>
  </div>
</nav>

<Watchlist />
<Options />
