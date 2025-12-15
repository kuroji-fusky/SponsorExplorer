<script>
  import { LandingSearchField, Meta, Link } from "$lib/components";
  import { HeartIcon, MinusIcon, SparklesIcon } from "@lucide/svelte";

  const familarItems = [
    {
      title: "Basics",
      excerpt:
        "Learn the basic understanding of SponsorExplorer and how it works.",
      href: "/docs/basics",
    },
    {
      title: "Tools 'n Queries",
      excerpt:
        "Filter more than just segments and videos - you can filter by length and also save 'em!",
      href: "/docs/search-filters",
    },
    {
      title: "FAQ",
      excerpt: "Some questions that have answers, what more would 'ya need?",
      href: "/docs/faq",
    },
  ];
</script>

<Meta title="Home" />

<main class="flex flex-col items-center space-y-32 prose-headings:font-bold">
  <section
    class="min-h-[40dvh] py-20 flex flex-col items-center justify-center"
  >
    <header class="text-center pb-8">
      <h1 class="text-5xl mb-6">SponsorExplorer</h1>
      <p class="text-base">
        Inspect and monitor <Link href="https://sponsor.ajay.app"
          >SponsorBlock</Link
        > segments in real-time. Inspired by the likes of Lartza's <Link
          href="https://sb.ltn.fi">SBbrowser</Link
        >.
      </p>
    </header>

    <LandingSearchField />

    <div class="pt-8 max-w-7xl w-full space-y-3.5">
      <div class="flex justify-between">
        <h2 class="text-lg">Recents</h2>
        <button
          aria-label="Hide recent searches"
          class="inline-flex items-center gap-x-1.5 px-2 py-1 rounded-md bg-white/15"
        >
          <MinusIcon size={14} />
          <span>Hide</span>
        </button>
      </div>
      <ul class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {#each [...Array(9)] as _}
          <li
            class="bg-neutral-900 rounded-md flex items-center py-2 pl-2 pr-12 border relative"
          >
            <div
              class="size-7 aspect-square rounded-full bg-red-600 mr-1.5"
            ></div>
            <span>Channel name</span>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section class="max-w-3xl w-full px-6">
    <h2 class="text-2xl text-center *:inline">
      Inspect segments from <SparklesIcon /> popular <SparklesIcon /> channels
    </h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 py-6">
      {#each [...Array(8)] as _}
        <li
          class="bg-neutral-900 rounded-md flex items-center gap-2 py-3 px-3.5 border relative"
        >
          <div class="size-12 aspect-square rounded-full bg-red-600"></div>
          <div class="grid">
            <div class="text-base font-bold">Channel name</div>
            <span class="opacity-50">Segment count</span>
          </div>
        </li>
      {/each}
    </ul>
    <p id="footnote" class="opacity-40">
      To prevent heavy load, only the latest 10 videos from the channels listed
      above are counted.
    </p>
  </section>

  <section class="max-w-6xl w-full px-6">
    <h2 class="text-2xl text-center">Get familar</h2>
    <div class="grid md:grid-cols-3 gap-2 py-6">
      {#each familarItems as { href, title, excerpt }}
        <a {href} class="block rounded-md border p-4">
          <div class="text-lg font-bold mb-1 mt-12">{title}</div>
          <span>{excerpt}</span>
        </a>
      {/each}
    </div>
  </section>
  <section class="mb-28">
    <div class="*:inline-block *:text-lg *:leading-none">
      <span>Created with</span>
      <HeartIcon class="align-middle mx-1 mb-1.5 inline-block" />
      <span>{" by "}</span>
      <Link href="https://kurojifusky.com">Kuro</Link>
    </div>

    <div>
      SponsorExplorer is <Link href="https://github.com/kuroji-fusky"
        >open source</Link
      >, you can help by contributing!
    </div>
  </section>
</main>
