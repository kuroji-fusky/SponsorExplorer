<script lang="ts">
  import Badge from "./Badge.svelte"
  import { cn } from "$lib/utils/cn"
  import type { Segments } from "$lib/types"

  export let segment: Segments
  export let chapterLabel: string = ""

  const segmentObj: Record<Segments, { bg: string; label: string }> = {
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
    highlight: { bg: "bg-sb-highlight", label: "Highlight" },
    outro: { bg: "bg-sb-endcards", label: "Endcards/Credits" },
    filler: { bg: "bg-sb-filler", label: "Filler" },
    exclusive_access: {
      bg: "bg-sb-exclusive-access",
      label: "Exclusive Access"
    },
    non_music: { bg: "bg-sb-non-music", label: "Non-Music" },
    chapter: {
      bg: "bg-slate-300",
      label: "Chapter"
    }
  }

  const s = segmentObj[segment]
</script>

<Badge class="relative inline-flex items-center gap-x-1.5 rounded-2xl cursor-help">
  <span class={cn(s.bg, "rounded-full size-3 flex-shrink-0")} aria-hidden />
  <span
    class={cn("text-sm font-semibold", chapterLabel ? "underline decoration-dashed" : "")}
    >{s.label}</span
  >
  <div class={cn(s.bg, "-z-[1] absolute inset-0 opacity-25")} />
</Badge>
