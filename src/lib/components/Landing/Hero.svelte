<script lang="ts">
  import { onMount } from "svelte"
  import { debounce } from "lodash-es"

  import InputField from "../InputField.svelte"
  import Link from "../Link.svelte"
  import { ytApiKey } from "$lib/utils"
  import { error } from "@sveltejs/kit"

  let searchInput: HTMLInputElement

  // yt package breaks something, so this is gonna be a temp fix
  const SEARCH_BASE_URL = `https://youtube.googleapis.com/youtube/v3/search?key=${ytApiKey}&part=snippet&type=channel&maxResults=6`

  let searchResultsFront: any[] = []

  onMount(() => {
    window.addEventListener(
      "input",
      debounce(async (e) => {
        const inputValue = e.target.value

        if (!inputValue) return

        const req = await fetch(`${SEARCH_BASE_URL}&q=${inputValue}`, {
          headers: {
            "cache-control": "max-age=300"
          }
        })

        const searchResults = await req.json()
        searchResultsFront = searchResults.items.map((item: any) => {
          const snippet = item.snippet

          return {
            avatar: snippet.thumbnails.medium,
            title: snippet.channelTitle,
            id: snippet.channelId
          }
        })
      }, 500)
    )
  })
</script>

<div
  class="*:flex *:flex-col *:items-center flex flex-col items-center pb-12 px-4"
>
  <div class="gap-y-4 py-8">
    <h1 class="!font-normal flex flex-col items-center">
      <span class="text-lg opacity-75">Welcome to</span>
      <div class="font-extrabold text-4xl">SponsorExplorer</div>
    </h1>
    <p>
      A rewrite of Lartza's <Link href="https://sb.ltn.fi" external
        >SBbrowser</Link
      > with a modern and intuitive UI and more features! Utilizes SponsorBlock and
      YouTube Data APIs
    </p>
  </div>
  <InputField
    bind:inputField={searchInput}
    placeholder="Search for channels or video ID..."
  >
    <div
      slot="results"
      class="grid px-3 py-1 rounded-md bg-neutral-900 gap-y-2.5"
    >
      {#if searchResultsFront.length !== 0}
        {#each searchResultsFront as item}
          <div class="flex items-center gap-x-2">
            <img
              src={item.avatar.url}
              class="size-12 rounded-full flex-shrink-0"
              alt=""
            />
            <div class="flex flex-col gap-y-0.5">
              <span class="text-lg font-bold">{item.title}</span>
              <span>{item.id}</span>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </InputField>
</div>
