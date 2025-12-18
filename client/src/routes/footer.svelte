<script lang="ts">
  import { Link } from "$lib/components";

  const footerLinks = [
    { href: "/docs", text: "Docs" },
    { href: "/about", text: "About" },
    { href: "/about", text: "Source code" },
  ];
</script>

<footer
  class="py-4 px-6 flex items-center justify-between max-w-screen-2xl mx-auto w-full"
>
  <span class="text-xs">
    {"© 2024-2026 "}<Link
      href="https://kurojifusky.com/"
      rel="noopenner noreferrer"
      target="_blank"
    >
      {"Kuroji Fusky"}
    </Link>{"; MIT licensed"}
  </span>
  <div class="inline-flex gap-x-4">
    {#each footerLinks as { href, text }}
      <Link {href}>{text}</Link>
    {/each}
  </div>
</footer>
