type ReadonlyDoubleArray<T> = readonly (readonly T[])[]

export type Predicate<T> = (
  picked: T,
  groups: ReadonlyDoubleArray<T>,
  groupIndex: number,
) => boolean

const notEmpty = <T>(arr: readonly T[]) =>
  arr.length > 0

function anyGroupPossible<T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  groupNum: number,
  predicate: Predicate<T>,
): boolean {
  if (!predicate(picked, groups, groupNum)) {
    return false
  }

  const currentPotIndex = pots.findIndex(notEmpty)
  // If there are no empty pots remaining, do not continue, just return true
  if (currentPotIndex < 0) {
    return true
  }

  // Otherwise, continue
  // The predicate returned true, so group `groupNum` is good
  // Put the picked item into it
  const newGroups = groups.slice()
  const oldGroup = newGroups[groupNum]
  newGroups[groupNum] = [picked, ...oldGroup]

  // Next, pick the head item from the current pot
  const newPots = pots.slice()
  const [newPicked, ...remainingItems] = newPots[currentPotIndex]
  newPots[currentPotIndex] = remainingItems

  // Determine if the picked item can be put into any group
  return newGroups.some((_, i) => anyGroupPossible(newPots, newGroups, newPicked, i, predicate))
}

export const allPossibleGroups = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
    groups
      .map((_, i) => i)
      .filter(i => anyGroupPossible(pots, groups, picked, i, predicate))

export const firstPossibleGroup = <T>(
  pots: ReadonlyDoubleArray<T>,
  groups: ReadonlyDoubleArray<T>,
  picked: T,
  predicate: Predicate<T>,
) =>
    groups.findIndex((_, i) => anyGroupPossible(pots, groups, picked, i, predicate))
