<script lang="ts">
  import { onMount } from "svelte"
  import { browser } from "$app/environment"

  import { cn } from "$lib/utils"
  import moveDom from "$lib/utils/moveDom"

  import { fly, fade } from "svelte/transition"

  import Button from "./Button.svelte"

  import XIcon from "lucide-svelte/icons/x"

  export let heading: string
  export let sidebarState = false
  export let eventToggler: any = () => {}

  onMount(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (key === "Escape" && sidebarState) eventToggler()
    })
  })
</script>

{#if browser}
  {#if sidebarState}
    <div use:moveDom={"body"}>
      <div
        transition:fly={{ duration: 175, x: 10 }}
        class="bg-neutral-950 border-neutral-600 border-r-0 px-6 rounded-tl-xl rounded-bl-xl border z-[9999] fixed inset-y-0 right-0 transition-all"
        style="width: 40rem;"
      >
        <div class="flex items-center justify-between py-4">
          <h1 class="text-2xl">{heading}</h1>
          <Button clickEvent={eventToggler} iconOnly>
            <XIcon size={18} />
          </Button>
        </div>
        <div>
          <slot />
        </div>
      </div>

      <div
        aria-hidden
        transition:fade={{ duration: 150 }}
        class="fixed inset-0 bg-black/50 z-50 transition-opacity"
        on:click={eventToggler}
      />
    </div>
  {/if}
{/if}
