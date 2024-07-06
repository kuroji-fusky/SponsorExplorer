<script lang="ts">
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import { cn } from "$lib/utils"

  import Button from "./Button.svelte"

  import XIcon from "lucide-svelte/icons/x"

  export let heading: string
  export let sidebarState = false
  export let eventToggler: any = () => {}

  const moveDom = (node: any, inject: any) => {
    const target = document.querySelector(inject)
    target!.appendChild(node)
  }

  onMount(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (key === "Escape" && sidebarState) eventToggler()
    })
  })
</script>

{#if browser}
  <div
    use:moveDom={"body"}
    class={cn(
      "bg-neutral-950  border-neutral-600 px-6 rounded-tl-xl rounded-bl-xl border z-[9999] fixed inset-y-0 right-0 transition-all",
      sidebarState
        ? "opacity-100"
        : "opacity-0 translate-x-4 pointer-events-none"
    )}
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
    aria-hidden="true"
    class={cn(
      "fixed inset-0 bg-black/50 z-50 transition-opacity",
      !sidebarState ? "opacity-0 pointer-events-none" : null
    )}
    use:moveDom={"body"}
    on:click={eventToggler}
  />
{/if}
