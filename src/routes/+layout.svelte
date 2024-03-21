<script>
  import "@fontsource/inter"
  import "@fontsource/inter/700.css"
  import "../app.css"
  import { Navbar, Footer } from "$lib/components/Base"
</script>

<Navbar />
<slot />
<Footer />
