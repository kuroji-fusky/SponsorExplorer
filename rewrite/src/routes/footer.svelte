<script lang="ts">
  const footerLinks = [
    { href: "/about", text: "About" },
    { href: "/about", text: "Source code" },
  ];
</script>

<footer class="py-4 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
  <span>
    {"© 2025 "}<a
      href="https://kurojifusky.com/"
      rel="noopenner noreferrer"
      target="_blank"
    >
      {"Kuroji Fusky"}
    </a>{"; MIT licensed"}
  </span>
  <div class="inline-flex gap-x-4">
    {#each footerLinks as { href, text }}
      <a {href}>{text}</a>
    {/each}
  </div>
</footer>
