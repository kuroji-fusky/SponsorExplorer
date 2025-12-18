<script lang="ts">
  import { page } from "$app/state";
  import ChannelInfo from "./ChannelInfo.svelte";

  const activePath = page.url.pathname;

  const { cid }: { cid: string } = $props();

  const tabItems = [
    { href: `/channel/${cid}`, text: "Channel videos" },
    { href: `/inspect/channel/${cid}`, text: "Submissions" },
  ];
</script>

<section class="my-2 space-y-3.5">
  <div
    role="listbox"
    class="flex gap-x-2 *:data-[tab-active]:[--root-tab:theme(color.orange.400)] *:hover:not-[[data-tab-active]]:[--root-tab:theme(color.neutral.400)] *:data-[tab-active]:[--tab-pn:none]"
  >
    {#each tabItems as { href, text }}
      <a
        {href}
        class={[
          "px-0.5 py-2 border-b-2 text-(--root-tab) border-b-(--root-tab) ",
        ]}
        style={`pointer-events: var(--tab-pn, auto)`}
        data-tab-active={activePath === href ? "" : undefined}
        aria-current={activePath === href ? "page" : undefined}>{text}</a
      >
    {/each}
  </div>
  <ChannelInfo />
</section>
