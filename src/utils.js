export function shallowCompare(o1:{}, o2:{}): boolean {
  const keys1 = Object.keys(o1)
  const keys2 = Object.keys(o2)
  if(keys1.length !== keys2.length) {
    return false
  }
  return !keys1.some((key1) => {
    return o1[key1] !== o2[key1]
  })
}

export function deepCompareArray(a1: Array<mixed>, a2: Array<mixed>): boolean {
  if(a1.length !== a2.length) { return false }
  if(typeof a1 !== 'object' && typeof a2 !== 'object') {
    return a1 === a2
  }
  return a1.every((val, i) => deepCompareArray(val, a2[i]))
}

export function deepCompare(any1: any, any2: any): boolean {
  if(typeof any1 !== typeof any2) {
    return false
  }
  if(Array.isArray(any1)) {
    return deepCompareArray(any1, any2)
  }
  return any1 === any2
}
