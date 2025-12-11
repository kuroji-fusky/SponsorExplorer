<script>
  import { LandingSearchField, Meta, Link } from "$lib/components";
  import { HeartIcon, SparklesIcon } from "@lucide/svelte";

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
      href: "/docs/filters",
    },
    {
      title: "FAQ",
      excerpt: "Some questions that have answers, what more would 'ya need?",
      href: "/uuid-inspector",
    },
  ];
</script>

<Meta title="Home" />

<main class="flex flex-col items-center space-y-32">
  <section class="h-[40dvh] flex flex-col gap-y-6 items-center justify-center">
    <header class="text-center">
      <h1 class="text-5xl font-bold mb-6">SponsorExplorer</h1>
      <p class="text-base">
        Inspect and monitor <Link href="https://sponsor.ajay.app"
          >SponsorBlock</Link
        > segments in real-time. Inspired by the likes of Lartza's <Link
          href="https://sb.ltn.fi">SBbrowser</Link
        >.
      </p>
    </header>

    <LandingSearchField />
  </section>

  <section class="max-w-3xl w-full px-6">
    <h2 class="text-2xl font-bold text-center *:inline">
      Inspect segments from <SparklesIcon/> popular <SparklesIcon/> channels
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
    <h2 class="text-2xl font-bold text-center">Get familar</h2>
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
      <HeartIcon class="align-middle mx-1 mb-1.5" />
      <span>{" by "}</span>
      <Link href="https://kurojifusky.com">Kuro</Link>
    </div>
  </section>
</main>
