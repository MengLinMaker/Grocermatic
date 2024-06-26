import * as Cheerio from 'cheerio'
import { scrapeStatic } from '../../request/scrapeStatic'
import { ProductInfoReport } from '../ProductInfoReport'
import { getProductInfoPage } from './getProductInfoPage'
import { getNumFromString } from '../../dataCleaning/getNumFromString'
import { wait } from '../../request/wait'

export const getProductInfoSection = async (url: string, _cookie?: string) => {
  const report = new ProductInfoReport()

  let pageLimit = Infinity
  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber++) {
    let jsonData = ''
    let backoffMillisecs = 2000
    let retry = 2
    while (jsonData == '') {
      const pageUrl = url + `?sortBy=unitPriceAscending&page=${pageNumber}`
      try {
        await wait(1000)
        const html = await scrapeStatic(pageUrl, _cookie)
        const $ = Cheerio.load(html)

        if (pageLimit == Infinity) {
          const paginationHtml = $('nav.coles-targeting-PaginationPaginationRoot').toString()
          const $$ = Cheerio.load(paginationHtml)
          const newPageLimit = getNumFromString($$('span').text())[1]
          if (newPageLimit) pageLimit = newPageLimit
        }

        jsonData = $('#__NEXT_DATA__').text()
      } catch {
        console.warn(`Coles - backoff scrape - ${pageUrl}`)
        await wait(backoffMillisecs)
      }
      backoffMillisecs *= 2
      if (retry-- == 0) break
    }
    report.recordProductInfoPage(getProductInfoPage, jsonData)

    const numProducts = report.get().productInfo.length
    const section = url.split('/').slice(-1)[0]
    console.debug(`Coles - ${section} - Page ${pageNumber}/${pageLimit} - ${numProducts} products`)
  }
  return report
}
