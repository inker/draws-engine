import { ReadonlyDoubleArray } from './types'
import insert from './insert'
import modifyAt from './modifyAt'

export default <T>(
  item: T,
  doubleArray: ReadonlyDoubleArray<T>,
  index: number,
): ReadonlyDoubleArray<T> =>
  modifyAt(doubleArray, index, insert(item))
