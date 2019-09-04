import { ReadonlyDoubleArray } from './utils/types'
import stubTrue from './utils/stubTrue'
import notEmpty from './utils/notEmpty'
import insertToDoubleArray from './utils/insertToDoubleArray'
import removeFromDoubleArray from './utils/removeFromDoubleArray'

export type Predicate<T> = (
  picked: T,
  groups: ReadonlyDoubleArray<T>,
  groupIndex: number,
) => boolean

const groupIsPossibleByIndex = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) => {
  const currentPotIndex = pots.findIndex(notEmpty)
  if (currentPotIndex < 0) {
    return stubTrue
  }

  // remove new team from pots
  const [newPicked, newPots] = removeFromDoubleArray(pots, currentPotIndex)

  const groupIsPossibleWithPickedInGroup = (groupIndex: number) =>
    groupIsPossibleByIndex(
      newPots,
      insertToDoubleArray(picked, groups, groupIndex),
      newPicked,
      predicate,
    )

  return (groupIndex: number): boolean =>
    predicate(picked, groups, groupIndex)
      && groups.map((item, i) => i)
        .some(groupIsPossibleWithPickedInGroup(groupIndex))
}

export const allPossibleGroups = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  groups.map((item, i) => i)
    .filter(groupIsPossibleByIndex(pots, groups, picked, predicate))

export const firstPossibleGroup = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  groups.map((item, i) => i)
    .find(groupIsPossibleByIndex(pots, groups, picked, predicate))
