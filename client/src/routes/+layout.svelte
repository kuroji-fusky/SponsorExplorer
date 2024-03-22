<script>
  import "../app.css"
  import "@fontsource/inter"
  import "@fontsource/inter/600.css"
  import "@fontsource/inter/700.css"
  import { Navbar, Footer } from "$lib/components/Base"
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<Navbar />
<div class="mx-auto max-w-screen-2xl px-6">
  <slot />
</div>
<Footer />
