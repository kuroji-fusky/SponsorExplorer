<script lang="ts">
  import { onMount } from "svelte"
  import { page } from "$app/stores"

  import BookmarkIcon from "lucide-svelte/icons/bookmark"
  import SearchIcon from "lucide-svelte/icons/search"
  import SettingsIcon from "lucide-svelte/icons/settings"
  import MenuIcon from "lucide-svelte/icons/menu"

  import Button from "../Button.svelte"
  import Watchlist from "./Sidebar/Watchlist.svelte"
  import Options from "./Sidebar/Options.svelte"
  import LiveChangesButton from "../LiveChangesButton.svelte"

  import { optionToggle, watchlistToggle } from "$lib/stores"

  const isPathRoot = $page.url.pathname === "/"
</script>

<nav
  class="px-8 flex justify-between py-4 items-center sticky top-0 bg-neutral-950 z-10 *:flex"
>
  <div class="items-center gap-x-4">
    <a href="/"
      ><span class="font-bold text-xl" translate="no">SponsorExplorer</span></a
    >
    {#if !isPathRoot}
      <Button
        title="Search"
        class="hidden md:flex items-center gap-x-1.5 py-1.5 px-3 !bg-transparent !border border-neutral-500 hover:border-neutral-300 w-48"
      >
        <SearchIcon size={18} />
        <span class="opacity-50">Search...</span>
      </Button>
    {/if}
  </div>

  <div class="gap-x-1">
    <!-- Mobile -->
    <Button iconOnly title="Search" class="!bg-transparent block md:hidden">
      <SearchIcon size={21} />
    </Button>
    <Button iconOnly title="Options" class="!bg-transparent block md:hidden">
      <MenuIcon size={21} />
    </Button>
    <!-- Desktop -->
    <LiveChangesButton />
    <!-- <Button
      iconOnly
      title="Server"
      class="md:flex hidden items-center gap-x-1 px-3 bg-neutral-800 hover:bg-neutral-900"
    >
      <ServerIcon size={20} />
      <span class="bg-green-500 size-2.5 rounded-md mx-0.5" />
      <strong>SponsorBlock</strong>
      <ChevronDownIcon size={18} />
    </Button> -->
    <Button
      iconOnly
      title="Watchlist"
      clickEvent={watchlistToggle.toggleState}
      class="hidden md:flex md:items-center"
    >
      <BookmarkIcon size={20} />
      <!-- <span class="px-1.5">0</span> -->
    </Button>
    <Button
      iconOnly
      title="Options"
      clickEvent={optionToggle.toggleState}
      class="hidden md:block"
    >
      <SettingsIcon size={20} />
    </Button>
  </div>
</nav>

<Watchlist />
<Options />
