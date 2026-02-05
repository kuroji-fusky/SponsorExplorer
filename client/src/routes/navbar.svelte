<script lang="ts">
  import { SquareKanbanIcon, SearchIcon, Settings2Icon } from "@lucide/svelte";
  import { IS_MOBILE, SIDEBAR_OPEN_MOBILE } from "$lib/stores";
  import { LogoNav } from "$lib/components";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { OptionsPane } from "$lib/components/options";
  import Button from "$lib/components/Button.svelte";

  const MOBILE_VIEWPORT_LIMIT = 1280;

  const optionsPanel = writable(false);

  setContext("options-panel", optionsPanel);

  function resizeWin() {
    IS_MOBILE.set(Math.round(window.innerWidth) <= MOBILE_VIEWPORT_LIMIT);

    // This ensures that the mobile nav always gets closed when resizing
    if (!$IS_MOBILE && $SIDEBAR_OPEN_MOBILE) {
      SIDEBAR_OPEN_MOBILE.set(false);
    }
  }

  onMount(() => {
    resizeWin();
  });
</script>

<svelte:window onresize={resizeWin} />

<nav
  class="dark:bg-neutral-950 z-10 fixed top-0 inset-x-0 flex items-center h-14 px-3 border-b dark:border-b-neutral-500 border-b-neutral-400"
>
  <LogoNav />
  <!-- Spacer -->
  <span class="flex-1"></span>
  <!-- Right-side action buttons -->
  <div class="flex items-center gap-x-0.5">
    <Button>
      {#snippet prefix()}
        <SquareKanbanIcon size={19} />
      {/snippet}
      Kanban
    </Button>
    <Button icon>
      <SearchIcon size={19} />
    </Button>
    <Button icon onclick={() => optionsPanel.set(!$optionsPanel)}>
      <Settings2Icon size={19} />
    </Button>
    <OptionsPane />
  </div>
</nav>
