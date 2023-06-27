import { generateRandInt } from "./generateRandInt"
import { getNumFromString } from "./getNumFromString"
import { roundDecimal } from "./roundDecimal"



export const getUnitFromString = (str:string):string => {
  let unitMeasure = str.slice(-2).toLowerCase() // Units are assumed to be 1-2 characters
  unitMeasure = unitMeasure.replace(/[^a-z]/g, '') // Only extract letters
  if (!['l','ml','kg','g'].includes(unitMeasure)) { return '' }
  return unitMeasure
}



export const shuffleArrayFisherYates = (array:any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = generateRandInt(0, i)
    const swapValue = array[i]
    array[i] = array[j]
    array[j] = swapValue
  }
  return array
}



export const generateUniqueArray = (array:any[]) => {
  const uniqueArray = [...new Set(array)]
  return uniqueArray
}



export const getMetricQuantity = (quanityString:string):number => {
  const numArray = getNumFromString(quanityString)
  if (numArray.length == 0) { return 0 }

  // Assume last number is associated with quantity
  const unitMeasure = getUnitFromString(quanityString)
  let metricQuantity = numArray.slice(-1)[0]

  if (['g', 'ml'].includes(unitMeasure)) {
    metricQuantity /= 1000
  }

  return roundDecimal(metricQuantity, 3)
}



export const getUnitPriceFromString = (unitPriceImplicitString:string):number => {
  const unitQuantityImplicit = getMetricQuantity(unitPriceImplicitString)
  const unitPriceImplicit = getNumFromString(unitPriceImplicitString)[0]
  const unitPrice = unitPriceImplicit / unitQuantityImplicit
  return unitPrice
}



export const limitArrayLengths = (oldArrays:any[][], desiredArrayLength:number):any[][][] => {
  const newArrays:any[] = []

  const lengthOfEachArray = oldArrays.map((val)=>{return val.length})
  const maxArrayLength = Math.max(...lengthOfEachArray)

  for (let arrayLengthCounter = 0; arrayLengthCounter < maxArrayLength; arrayLengthCounter += desiredArrayLength) {
    const subsetArrays = []
    for (let arrayID = 0; arrayID < oldArrays.length; arrayID++) {
      const arraySample = oldArrays[arrayID].slice(0,desiredArrayLength)
      if (arraySample.length > 0) {
        subsetArrays.push(arraySample)
      }
      oldArrays[arrayID] = oldArrays[arrayID].slice(desiredArrayLength)
    }
    if (subsetArrays.length > 0) {
      newArrays.push(subsetArrays)
    }
  }
  return newArrays
}