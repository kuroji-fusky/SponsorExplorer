<script lang="ts">
  import { onMount } from "svelte"
  import BookmarkIcon from "lucide-svelte/icons/bookmark"
  import SearchIcon from "lucide-svelte/icons/search"
  import SettingsIcon from "lucide-svelte/icons/settings"
  import ChevronDownIcon from "lucide-svelte/icons/chevron-down"

  import Button from "../Button.svelte"
  import Watchlist from "./Sidebar/Watchlist.svelte"
  import Options from "./Sidebar/Options.svelte"
  import { optionToggle, watchlistToggle } from "$lib/stores"
</script>

<nav
  class="px-8 flex justify-between py-4 items-center sticky top-0 bg-neutral-950 z-10 *:flex"
>
  <div class="items-center gap-x-4">
    <a href="/"
      ><span class="font-bold text-xl" translate="no">SponsorExplorer</span></a
    >
    <Button
      title="Search"
      class="flex items-center gap-x-1.5 py-1.5 px-3 !bg-transparent !border border-neutral-500 hover:border-neutral-300 w-48"
    >
      <SearchIcon size={18} />
      <span class="opacity-50">Search...</span>
    </Button>
  </div>

  <div class="gap-x-1">
    <Button
      iconOnly
      title="Server"
      class="flex items-center gap-x-1 px-3 bg-neutral-700 hover:bg-neutral-800"
    >
      <div>
        <span>{"Server: "}</span>
        <strong>SponsorBlock</strong>
      </div>
      <ChevronDownIcon size={18} />
    </Button>
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
