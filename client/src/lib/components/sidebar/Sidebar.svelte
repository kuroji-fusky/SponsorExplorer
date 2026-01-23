<script lang="ts">
  import { SIDEBAR_OPEN, SIDEBAR_OPEN_MOBILE, IS_MOBILE } from "$lib/stores";
  import { slide, fly } from "svelte/transition";
  import SidebarContents from "./SidebarContents.svelte";
  import Portal from "../Portal.svelte";
  import LogoNav from "../LogoNav.svelte";
  import FocusLock from "../FocusLock.svelte";

  // hard code the default width for the time being
  // TODO: fetch width state from localstorage
  const SIDEBAR_WIDTH = 300;

  function closeSidebarMobile() {
    if (!$IS_MOBILE) return;
    SIDEBAR_OPEN_MOBILE.set(false);
  }

  function handleCloseByEscape(e: KeyboardEvent) {
    if (e.key !== "Escape") return;

    closeSidebarMobile();
    return;
  }
</script>

<svelte:window onkeydown={handleCloseByEscape} />

{#if !$IS_MOBILE}
  {#if $SIDEBAR_OPEN}
    <div
      class="hidden xl:block sticky top-14 overflow-hidden w-(--sidebar-width) h-[calc(100dvh_-_--spacing(14))]"
      style={`--sidebar-width: ${SIDEBAR_WIDTH}px`}
      transition:slide={{ duration: 280, axis: "x" }}
    >
      <div class="flex h-full bg-neutral-900/20">
        <SidebarContents />
        <div id="panel-grip" class="flex-1 size-full border-r-2 border-neutral-700 hover:bg-neutral-400"></div>
      </div>
    </div>
  {/if}
{/if}

<Portal>
  {#if $IS_MOBILE}
    {#if $SIDEBAR_OPEN_MOBILE}
      <FocusLock ondismiss={closeSidebarMobile}>
        <div
          transition:fly={{ duration: 280, x: "-100%", opacity: 1 }}
          class="z-20 fixed grid grid-rows-[auto_1fr] left-0 inset-y-0 bg-neutral-900 w-full sm:w-[320px] rounded-none sm:rounded-tr-lg sm:rounded-br-lg"
        >
          <div
            class="flex items-center px-3 h-14 pr-4 border-b border-neutral-500"
          >
            <LogoNav mobile_layout />
          </div>
          <SidebarContents mobile_layout />
        </div>
      </FocusLock>
    {/if}
  {/if}
</Portal>
