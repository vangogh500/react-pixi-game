export function shallowCompare(o1:{}, o2:{}): boolean {
  const keys1 = Object.keys(o1)
  const keys2 = Object.keys(o2)
  if(keys1.length !== keys2.length) {
    return false
  }
  keys1.sort()
  keys2.sort()
  keys1.forEach((key1) => {
    if(o1[key1] !== o2[key1]) {
      return false
    }
  })
  return true
}
