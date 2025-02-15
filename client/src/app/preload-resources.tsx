"use client"

import ReactDOM from "react-dom"

export function PreloadResources() {
  // Preload YT assets
  ReactDOM.preconnect("https://www.youtube.com", {
    crossOrigin: "anonymous",
  })

  ReactDOM.preload("https://yt3.ggpht.com", {
    as: "fetch",
  })

  ReactDOM.preload("https://i.ytimg.com", {
    as: "fetch",
    fetchPriority: "high",
  })

  ReactDOM.preconnect("https://sponsor.ajay.app", {
    crossOrigin: "anonymous",
  })

  return null
}
