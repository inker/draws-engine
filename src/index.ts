import notEmpty from './utils/notEmpty'

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

function groupPredicate<T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  groupNum: number,
  predicate: Predicate<T>,
): boolean {
  const newGroups = groups.slice()
  const oldGroup = newGroups[groupNum]
  newGroups[groupNum] = [picked, ...oldGroup]
  return groupIsPossible(pots, newGroups, predicate)
}

function groupIsPossible<T>(
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
    .some(groupNum => groupPredicate(newPots, groups, picked, groupNum, predicate))
}

export const allPossibleGroups = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .filter(groupNum => groupPredicate(pots, groups, picked, groupNum, predicate))

export const firstPossibleGroup = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .find(groupNum => groupPredicate(pots, groups, picked, groupNum, predicate))
