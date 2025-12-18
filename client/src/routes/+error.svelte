<script lang="ts">
  export const prerender = true;
  import { page } from "$app/state";
  import { Meta } from "$lib/components";

  const niceGIFs = [
    "5475834038986093107",
    "17364360062336913319",
    "11473194451866210560",
    "18192247292012606736",
    "17924483405044686199",
    "25346514",
    "7294486942460034693",
  ];

  const randomGif = niceGIFs[Math.floor(Math.random() * niceGIFs.length)];
</script>

<Meta title="Error page" />
<svelte:head>
  <script
    async
    type="text/javascript"
    src="https://tenor.com/embed.js"
  ></script>
</svelte:head>

<main class="flex flex-col items-center justify-center text-center">
  <div class="tenor-gif-embed w-96" data-postid={randomGif}></div>
  <h1 class="text-5xl font-bold mb-5 mt-8 *:text-sm *:lg:text-base *:mb-2">
    {page.status}
  </h1>
  {#if page.status === 404}
    <p>
      It looks like you teleported somewhere else, fam. Were you tryna go
      somewhere?
    </p>
  {:else}
    <p>{page.error?.message}</p>
  {/if}
</main>
