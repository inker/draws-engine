export default <T>(arr: readonly T[], index: number, mapper: (val: T) => T) => {
  const newArr = arr.slice()
  newArr[index] = mapper(newArr[index])
  return newArr
}
