<script>
  import { SEO, ChannelItem, ChannelCarousel } from "$lib/components"
  import { Hero } from "$lib/components/Landing"
</script>

<SEO title="Home" />
<Hero />

<div class="flex flex-col gap-y-12">
  <ChannelCarousel heading="Previously viewed channels">
    {#each [...Array(8)] as _}
      <ChannelItem
        avatar="https://yt3.googleusercontent.com/uBlk-e8e923A70Seo2HKZxhFhofETR8SMB2JZR0ZhKDXB15uDPDumGCXHnfTrXx78B6mBqUfZK8=s800-c-k-c0x00ffffff-no-rj"
        name="Kuroji Fusky"
        handle="kurojifusky"
      />
    {/each}
  </ChannelCarousel>
  <ChannelCarousel heading="See segments from known channels">
    {#each [...Array(8)] as _}
      <ChannelItem
        avatar="https://yt3.googleusercontent.com/uBlk-e8e923A70Seo2HKZxhFhofETR8SMB2JZR0ZhKDXB15uDPDumGCXHnfTrXx78B6mBqUfZK8=s800-c-k-c0x00ffffff-no-rj"
        name="Kuroji Fusky"
        handle="kurojifusky"
      />
    {/each}
  </ChannelCarousel>
</div>
