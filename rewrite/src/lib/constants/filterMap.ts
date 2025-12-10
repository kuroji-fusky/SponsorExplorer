import { AllActionTypes, AllCategories } from "./sponsorBlock"

interface _FilterMetaKind {
  kind: "yt" | "sponsorblock"
}

type FilterMeta =
  | (_FilterMetaKind & {
      aliasOf: string
    })
  | (_FilterMetaKind & {
      type?: "string" | "number"
      label?: string
      constraints?: unknown

      helpText?: string
    })

export const FILTER_KIND_MAP =
  // biome-ignore format: consistency
  {
  username: { kind: "sponsorblock", label: "Username", type: "string" },
  userid: { kind: "sponsorblock", label: "User ID", type: "string" },
  uuid: { kind: "sponsorblock", label: "Submission ID", type: "string" },
  category: { kind: "sponsorblock", label: "Category", type: "string", constraints: AllCategories },
  action_type: { kind: "sponsorblock", label: "Action type", type: "string", constraints: AllActionTypes },

  segment_length: { kind: "sponsorblock", label: "Segment length", type: "number" },

  submission_count: { kind: "sponsorblock", label: "No. of submissions", type: "number" },
  category_count: { kind: "sponsorblock", label: "No. of categories", type: "number" },
  segment_count: { kind: "sponsorblock", label: "No. of segments",type: "number" },
  
  id: { kind: "yt", label: "Video ID", type: "string" },
  vid: { kind: "yt", aliasOf: "id" },

  title: { kind: "yt", label: "Video title", type: "string" },

  channel_id: { kind: "yt", label: "Channel ID", type: "string" },
  cid: { kind: "yt", aliasOf: "channel_id" },

  channel_handle: { kind: "yt", label: "Channel handle" },
  handle: { kind: "yt", aliasOf: "channel_handle" },

  channel_title: { kind: "yt", label: "Channel title" },
  ct: { kind: "yt", aliasOf: "channel_title" },
} as const satisfies Record<string, FilterMeta>

export const FILTER_OPERATOR_MAP = {
  "-": "neg",
  OR: "or",
  AND: "and",
  $: "has",
  "*": "all",
  "==": "eq",
  ">": "gt",
  ">=": "geq",
  "<": "lt",
  "<=": "leq",
} as const

export type TagLiteral = keyof typeof FILTER_KIND_MAP
type OperatorLiteral = keyof typeof FILTER_OPERATOR_MAP

export const FILTER_TAGS = Object.keys(FILTER_KIND_MAP) as TagLiteral[]
// biome-ignore format: keep type coercion in one line
export const FILTER_OPERATORS = Object.keys(FILTER_OPERATOR_MAP) as OperatorLiteral[]

export type FilterParams = Partial<{
  __rawInput: string
  operators: [OperatorLiteral | undefined]
  tag: TagLiteral
}> & { query: string }
