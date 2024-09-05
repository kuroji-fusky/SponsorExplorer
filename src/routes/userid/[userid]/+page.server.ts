import type { PageServerLoad } from "./$types"

export const load = (async ({ params, url, event }) => {
  const { userid } = params

  const sbBrowserUrl = `${url.protocol}//${url.host}/api/sbbrowser/userid/${userid}`
  const sbAjayUrl = `https://sponsor.ajay.app/api/userInfo?publicUserID=${userid}`

  const sbbDataRes = await fetch(sbBrowserUrl)
  const sbbData = await sbbDataRes.json()

  const sbAjayDataRes = await fetch(sbAjayUrl)
  const sbAjayData = await sbAjayDataRes.text()

  return {
    userid,
    sbAjayData: JSON.parse(sbAjayData),
    sbbData
  }
}) satisfies PageServerLoad
