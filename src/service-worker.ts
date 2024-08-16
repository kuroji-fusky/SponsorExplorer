/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

import { build, files, version } from "$service-worker"

declare let self: ServiceWorkerGlobalScope

console.log({ build, files, version })
