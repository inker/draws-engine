import notEmpty from './utils/notEmpty'
import modifyAt from './utils/modifyAt'
import cons from './utils/cons'

type ReadonlyDoubleArray<T> = readonly (readonly T[])[]

export type Predicate<T> = (
  picked: T,
  groups: ReadonlyDoubleArray<T>,
  groupIndex: number,
) => boolean

const filterGroups = <T>(
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  groups.map((item, i) => i)
    .filter(i => predicate(picked, groups, i))

const groupIsPossibleByIndex = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  (groupNum: number): boolean => {
    const newGroups = modifyAt(groups, groupNum, cons(picked))
    return groupsArePossible(pots, newGroups, predicate)
  }

function groupsArePossible<T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  predicate: Predicate<T>,
) {
  const currentPotIndex = pots.findIndex(notEmpty)
  if (currentPotIndex < 0) {
    return true
  }

  const newPots = pots.slice()
  const [picked, ...remainingItems] = newPots[currentPotIndex]
  newPots[currentPotIndex] = remainingItems
  return filterGroups(groups, picked, predicate)
    .some(groupIsPossibleByIndex(newPots, groups, picked, predicate))
}

export const allPossibleGroups = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .filter(groupIsPossibleByIndex(pots, groups, picked, predicate))

export const firstPossibleGroup = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .find(groupIsPossibleByIndex(pots, groups, picked, predicate))
