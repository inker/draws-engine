export default <T>(item: T) =>
  (arr: readonly T[]) =>
    [item, ...arr]
