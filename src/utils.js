export function shallowCompare(o1:{}, o2:{}): boolean {
  const keys1 = Object.keys(o1)
  const keys2 = Object.keys(o2)
  if(keys1.length !== keys2.length) {
    return false
  }
  return !keys1.some((key1) => (key1 !== 'children' && o1[key1] !== o2[key1]))
}

export function shallowCompareArray(a1: Array<mixed>, a2: Array<mixed>): boolean {
  if(a1.length !== a2.lenght) {
    return false
  }
  return a1.reduce((acc, item) => acc && a2.includes(item), true)
}