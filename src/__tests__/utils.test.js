import * as utils from '../utils.js'

describe('utils', function() {
  test('shallowCompare', function() {
    const o1 = {
      city: 'Nha Trang',
      country: 'Vietnam',
      continent: 'Asia'
    }
    const o2 = {
      city: 'Nha Trang',
      country: 'Vietnam',
      continent: 'Asia'
    }
    const o3 = {
      state: 'New York',
      location: 'Union Park'
    }
    expect(() => utils.shallowCompare(1,2)).toThrow()
    expect(() => utils.shallowCompare('1','2')).toThrow()
    expect(utils.shallowCompare({}, {})).toBe(true)
    expect(utils.shallowCompare(o1, o2)).toBe(true)
    expect(utils.shallowCompare(o3,o2)).toBe(false)
  })
})
