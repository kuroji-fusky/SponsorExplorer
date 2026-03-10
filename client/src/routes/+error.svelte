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

<main class="flex flex-col items-center justify-center text-center  prose-p:text-base">
  <div class="tenor-gif-embed w-96" data-postid={randomGif}></div>
  <h1 class="text-5xl font-bold mb-5 mt-8 *:text-sm *:lg:text-base">
    {page.status}
  </h1>
  {#if page.status === 404}
    <p>
      It looks like you teleported somewhere else, fam. Were you tryna go
      somewhere?
    </p>
  {:else}
    <p>Oh, this isn't the typical 404 page you'd normally encounter...</p>
  {/if}
  <code class="p-2 rounded-md bg-neutral-800 block mt-4">{JSON.stringify(page.error)}</code>
</main>
