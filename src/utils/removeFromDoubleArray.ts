import { ReadonlyDoubleArray } from './types'

export default <T>(
  doubleArray: ReadonlyDoubleArray<T>,
  index: number,
): [T, ReadonlyDoubleArray<T>] => {
  const newDoubleArray = doubleArray.slice()
  const [newItem, ...remainingItems] = newDoubleArray[index]
  newDoubleArray[index] = remainingItems
  return [newItem, newDoubleArray]
}
