import notEmpty from './utils/notEmpty'

export type Predicate<T> = (
  picked: T,
  groups: T[][],
  groupIndex: number,
) => boolean

export const allPossibleGroups = <T>(
  pots: T[][],
  groups: T[][],
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .filter(groupNum => groupPredicate(pots, groups, picked, groupNum, predicate))

export const firstPossibleGroup = <T>(
  pots: T[][],
  groups: T[][],
  picked: T,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, predicate)
    .find(groupNum => groupPredicate(pots, groups, picked, groupNum, predicate))

const filterGroups = <T>(
  groups: T[][],
  picked: T,
  predicate: Predicate<T>,
) =>
  groups.map((item, i) => i)
    .filter(i => predicate(picked, groups, i))

function groupPredicate<T>(
  pots: T[][],
  groups: T[][],
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
  pots: T[][],
  groups: T[][],
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
