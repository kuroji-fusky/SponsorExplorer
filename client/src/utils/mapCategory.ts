import type { Category } from "./SponsorBlock.types"

export const mapCategory = (category: Category): { bg: string, label: string } => {
  const categoryMap = {
    sponsor: {
      bg: "bg-sb-sponsor",
      label: "Sponsor",
    },
    selfpromo: {
      bg: "bg-sb-selfpromo",
      label: "Unpaid/Self Promotion",
    },
    intro: {
      bg: "bg-sb-intermission",
      label: "Intro/Intermission",
    },
    interaction: {
      bg: "bg-sb-interaction",
      label: "Interaction Reminder",
    },
    preview: {
      bg: "bg-sb-preview",
      label: "Preview/Recap/Hook"
    },
    poi_highlight: {
      bg: "bg-sb-highlight",
      label: "Highlight"
    },
    outro: {
      bg: "bg-sb-endcards",
      label: "Endcards/Credits"
    },
    filler: {
      bg: "bg-sb-filler",
      label: "Tangents/Jokes"
    },
    exclusive_access: {
      bg: "bg-sb-exclusive-access",
      label: "Exclusive Access",
    },
    music_offtopic: {
      bg: "bg-sb-non-music",
      label: "Non-Music"
    },
    chapter: {
      bg: "bg-slate-300",
      label: "Chapter",
    }
  }

  return categoryMap[category]
}
