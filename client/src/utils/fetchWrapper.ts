import { round } from "lodash-es"
import { isValidJSON } from "./parsers"

export const fetchWrapper = async <ReturnPromise = string>(
  url: string,
  init?: RequestInit
): Promise<[ReturnPromise, number]> => {
  try {
    const startTime = performance.now()
    const _req = await fetch(url, init)

    const reqStatus = _req.status
    const reqText = await _req.text()

    const endTime = performance.now()

    const _reqTimeMs = endTime - startTime
    const _reqTimeSec = round(_reqTimeMs / 1000, 1)
    
    if (process.env.NODE_ENV === "development") {
      const totalReqTime = _reqTimeMs > 1024 ? `${_reqTimeSec}s` : `${Math.round(_reqTimeMs)}ms`
      console.debug(`Request url [took ${totalReqTime}]:`, url)
    }

    if (isValidJSON(reqText)) {
      return [JSON.parse(reqText as string), reqStatus]
    }

    return [reqText as ReturnPromise, reqStatus]
  } catch (e) {
    console.error("An error has occurred:", e)
    throw e
  }
}
