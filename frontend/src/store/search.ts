import MiniSearch from 'minisearch'
import { config } from '../../../global'
import { webWorkerFactory } from '../../../common/webWorkerFactory'
import { createSignal } from 'solid-js'
import { cloneInstance } from '../logic/cloneInstance'
import { ProductInfo } from '../../../common/interface'
import { roundDecimal } from '../../../common/roundDecimal'

const searchOptions = {
  fields: ['name'],
  storeFields: ['name', 'url', 'img', 'price', 'quantity', 'unitPrice'],
}

export const [miniSearch, setMiniSearch] = createSignal(new MiniSearch(searchOptions))
export const [miniSearchLoaded, setMiniSearchLoaded] = createSignal(0)

let i = 0
const _miniSearch = new MiniSearch(searchOptions)
const fillSearchEngineWithProduct = (products: any[]) => {
  _miniSearch?.addAll(
    products.map((productInfo) => {
      const productInfoSearch = {
        ...productInfo,
        id: i++,
      }
      productInfoSearch.price = productInfo.price ? productInfo.price : productInfo.history[0].price
      productInfoSearch.unitPrice = roundDecimal(productInfoSearch.price / productInfo.quantity, 2)
      productInfoSearch.history = [
        {
          daySinceEpoch: 0,
          price: productInfoSearch.price,
        },
      ]
      return productInfoSearch
    }),
  )
  setMiniSearch(cloneInstance(_miniSearch))
}

const fetchJson = () => {
  self.onmessage = async (e: MessageEvent) => {
    const url: string = e.data
    const res = await fetch(url)
    if (!res) return
    const json = await res.json()
    postMessage(json)
  }
}

// Fetch products with non-blocking webworker
let loadedChunks = 0
const fetchJsonWorker = webWorkerFactory(fetchJson)
fetchJsonWorker.onmessage = (e: MessageEvent) => {
  const products: ProductInfo[] = e.data
  fillSearchEngineWithProduct(products)
  loadedChunks += 1
  setMiniSearchLoaded(loadedChunks / config.numChunks)
  if (loadedChunks === config.numChunks) {
    fetchJsonWorker.terminate()
  }
}

const urls = Array.from(
  { length: config.numChunks },
  (_, i) => `${config.productBaseUrl}/product${i}.json`,
)
urls.map(async (url) => fetchJsonWorker.postMessage(url))
