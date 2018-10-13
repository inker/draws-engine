import Predicate from './types/Predicate'

export {
  Predicate,
}

export const allPossibleGroups = <T>(
  pots: T[][],
  groups: T[][],
  picked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, currentPotIndex, predicate)
    .filter(groupNum => groupPredicate(pots, groups, picked, groupNum, currentPotIndex, predicate))

export const firstPossibleGroup = <T>(
  pots: T[][],
  groups: T[][],
  picked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) =>
  filterGroups(groups, picked, currentPotIndex, predicate)
    .find(groupNum => groupPredicate(pots, groups, picked, groupNum, currentPotIndex, predicate))

const filterGroups = <T>(
  groups: T[][],
  picked: T,
  currentPotIndex: number,
  predicate: Predicate<T>,
) => groups.map((item, i) => i)
  .filter(i => predicate(picked, i, currentPotIndex, groups))

function groupPredicate<T>(
  pots: T[][],
  groups: T[][],
  picked: T,
  groupNum: number,
  currentPotIndex: number,
  predicate: Predicate<T>,
): boolean {
  const newGroups = groups.slice()
  const oldGroup = newGroups[groupNum]
  newGroups[groupNum] = [...oldGroup, picked]
  return groupIsPossible(pots, newGroups, currentPotIndex, predicate)
}

function groupIsPossible<T>(
  pots: T[][],
  groups: T[][],
  currentPotIndex: number,
  predicate: Predicate<T>,
) {
  if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
    return true
  }
  const newPots = pots.slice()
  const oldPot = newPots[currentPotIndex]
  const oldPotCopy = [...oldPot]
  const picked = oldPotCopy.pop()
  newPots[currentPotIndex] = oldPotCopy
  return filterGroups(groups, picked, currentPotIndex, predicate)
    .some(groupNum => groupPredicate(newPots, groups, picked, groupNum, currentPotIndex, predicate))
}
