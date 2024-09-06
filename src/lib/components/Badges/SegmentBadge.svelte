<script lang="ts">
  import Badge from "./Badge.svelte"
  import { cn } from "$lib/utils"
  import type { Segments } from "$lib/types"

  export let segment: Segments
  export let chapterLabel: string = ""

  const segmentObj = {
    sponsor: {
      bg: "bg-sb-sponsor",
      label: "Sponsor"
    },
    selfpromo: {
      bg: "bg-sb-selfpromo",
      label: "Unpaid/Self Promotion"
    },
    intro: {
      bg: "bg-sb-intermission",
      label: "Intro/Intermission"
    },
    interaction: {
      bg: "bg-sb-interaction",
      label: "Interaction Reminder"
    },
    preview: { bg: "bg-sb-preview", label: "Preview/Recap/Hook" },
    poi_highlight: { bg: "bg-sb-highlight", label: "Highlight" },
    outro: { bg: "bg-sb-endcards", label: "Endcards/Credits" },
    filler: { bg: "bg-sb-filler", label: "Filler Tangent" },
    exclusive_access: {
      bg: "bg-sb-exclusive-access",
      label: "Exclusive Access"
    },
    music_offtopic: { bg: "bg-sb-non-music", label: "Non-Music" },
    chapter: {
      bg: "bg-slate-300",
      label: "Chapter"
    }
  }

  const _seg = segmentObj[segment]
</script>

<Badge
  class="relative inline-flex items-center gap-x-1.5 rounded-2xl cursor-help"
>
  <span
    class={cn(_seg.bg, "rounded-full size-3 flex-shrink-0 z-[1]")}
    aria-hidden
  />
  <span
    class={cn(
      "text-sm font-semibold z-[1]",
      chapterLabel ? "underline decoration-dashed" : ""
    )}>{chapterLabel ? chapterLabel : _seg.label}</span
  >
  <div class={cn(_seg.bg, "z-0 absolute inset-0 opacity-25")} />
</Badge>
