import type { Snippet } from "svelte";

/**
 * @template P Props of a given component
 */
export type WithChildrenSnippet<P extends object> = { children?: Snippet } & P
