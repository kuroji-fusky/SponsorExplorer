<script>
  import { watchlistToggle } from "$lib/stores"
  import PortalView from "../../PortalView.svelte"
</script>

<PortalView
  heading="Watchlist"
  sidebarState={$watchlistToggle}
  eventToggler={watchlistToggle.toggleState}
>
  <div>
    Watchlists are stored locally on your browser, you can import/export your
    watchlist if necessary.
  </div>
</PortalView>
