import { ProductInfo } from "../interface"
import { aldiProductInfo } from "./getProductInfo"



const cornHtml:string = `<a class="box--wrapper ym-gl ym-g25 " title="to product detail" href="https://www.aldi.com.au/en/groceries/freezer/freezer-detail/ps/p/market-fare-corn-kernels-1kg-1/"><div class="box m-text-image"><div class="ratio-container m-ratio-1x1 ym-clearfix m-no-ratio-on-phone"><div class="ratio-container m-ratio-57x32 box--image-container m-no-ratio-on-phone"><img src="https://www.aldi.com.au/fileadmin/_processed_/a/2/csm_ALN2853_AWARDS_FROZEN_FOOD_1x1_228x128_2_b2bba5422e.jpg" width="226" height="126"   alt="" ></div><div class="ratio-container m-ratio-57x25 box--description m-no-ratio-on-phone"><div class="box--description--header">Market Fare Corn Kernels 1kg</div><div class="box--price"><span class="ym-hideme">Unit</span><span class="box--amount"></span><span class="ym-hideme">Current Price</span><span class="box--value">$4.</span><span class="box--decimal">19</span><span class="ym-hideme">Unit price</span><span class="box--baseprice">$4.19 per kg</span></div></div><span class="detail--button"><span class="icon-arrow m-tiny m-right m-darkblue detail--button--icon-arrow"></span></span></div></div></a>`

const noJsonHtml:string = ''

describe("coles product scraper", () => {
  it("should parse product data", async()=>{
    const productInfo = aldiProductInfo(cornHtml)
    const expectedProductInfo:ProductInfo = {
      name: 'White Seedless Grapes Loose',
      url: 'https://www.coles.com.au/product/coles-white-seedless-grapes-loose-approx.-800g-6706395',
      img: 'https://productimages.coles.com.au/productimages/6/6706395.jpg',
      price: 2.88,
      quantity: 0.8,
      unitPrice: 3.6
    }
    expect(productInfo).toEqual(expectedProductInfo)
  })

  it("should handle lack of JSON", async()=>{
    const productInfo = aldiProductInfo(noJsonHtml)
    expect(productInfo).toEqual(null)
  })
})