<script>
  import "../app.css"
  import "@fontsource/inter"
  import "@fontsource/inter/600.css"
  import "@fontsource/inter/700.css"
  import { Navbar, Footer } from "$lib/components/Base"
  import { browser } from "$app/environment"
</script>

<Navbar />
<div class="mx-auto max-w-screen-2xl px-6 min-h-[calc(100dvh-7.5rem)]">
  <slot />
</div>
<Footer />
