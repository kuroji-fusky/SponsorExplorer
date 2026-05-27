interface SWTemplate<
  T extends string,
  // biome-ignore lint/suspicious/noExplicitAny: a catch-all type to ensure code completion
  P extends Record<string, any> | Record<string, any>[] | string[],
> {
  type: T
  payload: P
}

export type SWMessageTypes =
  | SWTemplate<"APPEND_YT_IDS", string[]>
  | SWTemplate<"UPDATE_SEGMENTS", Record<string, any>[]>
