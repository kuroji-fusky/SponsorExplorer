import { setContext } from "svelte"
import { writable } from "svelte/store"

const clientInit = () => {
  const YT_IFRAME_API_LOADED = writable(false)
  setContext("ytIframeLoaded", YT_IFRAME_API_LOADED)

  // Iframe API init
  const docHead = document.head

  const iframeSrc = "https://www.youtube.com/iframe_api"

  if (window.YT) return

  const iframeAPI = document.createElement("script")
  iframeAPI.setAttribute("src", iframeSrc)
  iframeAPI.setAttribute("fetchpriority", "high")
  docHead.prepend(iframeAPI)

  const headObserver = new MutationObserver((mutations) => {
    for (const mut of mutations) {
      const ytIframeWidget = Array.from(mut.addedNodes).find(
        (n) =>
          (n as HTMLScriptElement).id === "www-widgetapi-script" &&
          (n as HTMLScriptElement).tagName === "SCRIPT",
      ) as HTMLScriptElement

      if (!ytIframeWidget) return

      headObserver.disconnect()
      ytIframeWidget.onload = () => {
        if (!(window.YT && window.YT.Player)) {
          console.error("YT script loaded but client-side API is somehow missing")
          return
        }

        YT_IFRAME_API_LOADED.set(true)
        return
      }

      return
    }
  })

  headObserver.observe(docHead, { childList: true, subtree: true })

  // Dexie init
}

export default clientInit
