/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import type { SWMessageTypes } from "./lib/types/sw"

const _dev = import.meta.env.DEV
const _self = globalThis.self as unknown as ServiceWorkerGlobalScope

const chan = new BroadcastChannel("sveltekit-sw")
chan.addEventListener("message", async (e) => {
  const messageData = e.data as SWMessageTypes
  console.log("got the data:", messageData)

  switch (messageData.type) {
    case "APPEND_YT_IDS":
      console.log(messageData.payload)
      break

    default:
      console.log(`${messageData.type} is not a recognized payload type`)
  }
})

_self.addEventListener("install", (e) => {
  if (_dev) {
    e.waitUntil(_self.skipWaiting())
  }

  e.addRoutes({
    condition: { urlPattern: "/video/*", protocol: "*", port: "*" },
    source: "network",
  })
  e.addRoutes({
    condition: { urlPattern: "/channel/*", protocol: "*", port: "*" },
    source: "network",
  })
})

_self.addEventListener("activate", (e) => {
  if (_dev) {
    e.waitUntil(
      _self.clients.matchAll({ includeUncontrolled: true, type: "window" }).then((clients) => {
        if (clients.some((client) => !client.controller)) {
          _self.clients.claim()
        }
      }),
    )
  }

  console.log("Activating SW", e)
})

_self.addEventListener("push", async (e) => {
  console.log("We got asdasdsome data", e, e.data)
})
