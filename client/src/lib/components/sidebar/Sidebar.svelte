<script lang="ts">
  import { SIDEBAR_OPEN, SIDEBAR_OPEN_MOBILE, IS_MOBILE } from "$lib/stores";
  import { slide, fly } from "svelte/transition";
  import SidebarContents from "./SidebarContents.svelte";
  import Portal from "../Portal.svelte";
  import LogoNav from "../LogoNav.svelte";
  import FocusLock from "../FocusLock.svelte";
  import { onMount } from "svelte";

  // hard code the default width for the time being
  // TODO: fetch width state from localstorage
  const SIDEBAR_WIDTH = 300;

  function closeSidebarMobile() {
    if (!$IS_MOBILE) return;
    SIDEBAR_OPEN_MOBILE.set(false);
  }

  onMount(() => {
    const { abort, signal } = new AbortController();

    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      closeSidebarMobile();
      return;
    });
  });
</script>

{#if !$IS_MOBILE && $SIDEBAR_OPEN}
  <div
    class="flex overflow-hidden w-(--sidebar-width)"
    style={`--sidebar-width: ${SIDEBAR_WIDTH}px`}
    transition:slide={{ duration: 280, axis: "x" }}
  >
    <SidebarContents />
    <div id="panel-grip" class="flex-1 size-full bg-red-300"></div>
  </div>
{/if}

<Portal>
  {#if $IS_MOBILE && $SIDEBAR_OPEN_MOBILE}
    <FocusLock ondismiss={closeSidebarMobile}>
      <div
        transition:fly={{ duration: 280, x: "-100%", opacity: 1 }}
        class="fixed grid grid-rows-[auto_1fr] left-0 inset-y-0 bg-neutral-800"
      >
        <div class="flex items-center px-3 h-14 pr-4">
          <LogoNav mobile_layout />
        </div>
        <SidebarContents mobile_layout />
      </div>
    </FocusLock>
  {/if}
</Portal>
