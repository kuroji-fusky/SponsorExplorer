import * as cheerio from "cheerio"

const BASE_SB_URL = "https://sb.ltn.fi"

const fetchSBbrowser = async (
  endpoint: "userid" | "username" | "video",
  query: string,
  params?: object
) => {
  const reqUrl = `${BASE_SB_URL}/${endpoint}/${query}`

  const $ = await cheerio.fromURL(reqUrl)

  const tableData = $(".row table tbody")
  const updatedSBTime = $(".container-fluid .row:last-child > .col")

  const isDataEmpty = tableData.html()!.trim() === ""

  const _rawTableData = tableData
    .children("tr")
    .map((_, el) => $(el).html()!)
    .toArray()

  const segments = _rawTableData.map((x) => {
    const clean = x
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean)

    return clean.map((x) => {
      const textContent = $(x).text()

      // Split its contents from this particular emoji
      return textContent.split("✂")[0]
    })
  })

  const [utcTime, relative] = updatedSBTime.text().split("(")

  const updateTime = {
    utcTime,
    relative
  }

  return { reqUrl, segments, isDataEmpty, updateTime }
}

export default fetchSBbrowser
