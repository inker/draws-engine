export default <T>(arr: readonly T[], index: number, mapper: (item: T) => T) => {
  const newArr = arr.slice()
  newArr[index] = mapper(newArr[index])
  return newArr
}
