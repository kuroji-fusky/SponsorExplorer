<script lang="ts">
  import { ArrowRightIcon } from "@lucide/svelte";

  let isInputFocused = $state(false);
  let searchInput: HTMLInputElement;
  let kindInput: HTMLSelectElement;
</script>

<div
  class="flex items-center rounded-xl border w-full max-w-[600px] overflow-hidden"
>
  <input
    bind:this={searchInput}
    id="input-search"
    class="flex-1 text-sm px-3.5 py-3 bg-inherit border-none !outline-none ring-0"
    type="text"
    role="searchbox"
    placeholder="Paste a YouTube URL"
  />
  <hr class="h-5 border-l mx-2" />
  <select bind:this={kindInput} class="p-3 bg-neutral-950 text-sm border-none">
    <option id="yt-id">Video ID</option>
    <option id="yt-id">Channel ID/handle</option>
    <option id="sb-id">(SB) UserID</option>
    <option id="sb-id">(SB) Username</option>
  </select>
  <button class="p-3 bg-amber-700" aria-label="Search">
    <ArrowRightIcon size={18} />
  </button>
</div>
