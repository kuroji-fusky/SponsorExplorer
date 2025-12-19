<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Portal from "../Portal.svelte";
  import FocusLock from "../FocusLock.svelte";
  import { fly } from "svelte/transition";
  import optionsList from "./options";
  import { XIcon } from "@lucide/svelte";

  import { compile as mdsvexParse } from "mdsvex";

  const lmao = getContext<Writable<boolean>>("options-panel");

  function togglePane() {
    if (!$lmao) return;
    lmao.set(false);
  }

  function handleCloseByEscape(e: KeyboardEvent) {
    if (e.key !== "Escape") return;

    togglePane();
    return;
  }
</script>

<svelte:window onkeydown={handleCloseByEscape} />

<Portal>
  {#if $lmao}
    <FocusLock ondismiss={togglePane}>
      <div
        transition:fly={{ duration: 280, x: "100%", opacity: 1 }}
        class="z-20 grid grid-rows-[auto_1fr] fixed w-full md:w-[40rem] inset-y-0 right-0 bg-neutral-900"
      >
        <div class="h-14 flex items-center justify-between px-3.5 border-b border-neutral-500">
          <h1 class="pl-1 text-lg font-bold">Settings</h1>
          <button
            onclick={togglePane}
            class="p-1.5 rounded-md border"
            aria-label="Close options menu"
          >
            <XIcon size={18} />
          </button>
        </div>
        <div class="px-4 h-full overflow-y-auto">
          {#each optionsList as { heading, component, title, description, settingId, props }}
            {#if heading}
              <h2 class="pb-1 first:pt-1 pt-6 opacity-60 font-semibold">
                {heading}
              </h2>
            {/if}
            {#if component && title && description}
              <div data-config-item={settingId} class="py-2">
                <h3 class="font-bold text-base mb-1">
                  {#await mdsvexParse(title) then val}
                    {@html val.code}
                  {/await}
                </h3>
                {#await mdsvexParse(description) then val}
                  {@html val.code}
                {:catch}
                  {description}
                {/await}
              </div>
            {/if}
          {/each}
          <section class="px-3 py-2.5 rounded-md bg-yellow-600/40">
            Note: Settings apply only on this browser, you can export and import them
            from another browser if you wish.
          </section>
        </div>
      </div>
    </FocusLock>
  {/if}
</Portal>
