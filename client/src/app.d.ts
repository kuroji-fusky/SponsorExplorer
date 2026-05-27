// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/// <reference types="vite-plugin-pwa/svelte" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="@types/youtube" />
import type { SWMessageTypes } from "./lib/types/sw"

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface BroadcastChannel {
    postMessage(message: SWMessageTypes): void
  }
}

export {}
