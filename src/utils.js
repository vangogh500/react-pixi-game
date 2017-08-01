export function shallowCompare(o1:{}, o2:{}): boolean {
  const keys1 = Object.keys(o1)
  const keys2 = Object.keys(o2)
  if(keys1.length !== keys2.length) {
    return false
  }
  return !keys1.some((key1) => (key1 !== 'children' && o1[key1] !== o2[key1]))
}
