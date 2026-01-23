<script lang="ts">
  import { Link } from "$lib/components";
  import { ChevronUpIcon } from "@lucide/svelte";

  const footerLinks = [
    { href: "/docs", text: "Docs" },
    { href: "/about", text: "About" },
    {
      href: "https://github.com/kuroji-fusky/SponsorExplorer",
      text: "Source code",
    },
  ];
</script>

<footer
  class="py-4 px-6 flex items-center justify-between max-w-screen-2xl mx-auto w-full"
>
  <span class="text-xs">
    {"© 2024-2026 "}<Link href="https://kurojifusky.com/">
      {"Kuroji Fusky"}
    </Link>{"; MIT licensed"}
  </span>
  <div class="inline-flex gap-x-4">
    <div class="se-link cursor-pointer">
      <span>Related projects</span>
      <ChevronUpIcon size={16} class="inline-block align-middle" />
    </div>
    {#each footerLinks as { href, text }}
      <Link {href}>{text}</Link>
    {/each}
  </div>
</footer>
