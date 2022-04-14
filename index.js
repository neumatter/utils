
import IS from '@neumatter/is'

export default class utils {
  /**
   * Converts a string to camelCase.
   *
   * @param {any} input
   * @returns {string}
   */
  static camelCase (input) {
    const isArray = value => Array.isArray(value) && typeof value === 'object'
    const isString = value => typeof value === 'string'
    const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value)
    const toWords = i => {
      const CAMEL_REGEX = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g
      i = i && typeof i === 'string' ? i : i ? String(i) : ''
      return i.replace(/[\u{0080}-\u{FFFF}]/gu, '').match(CAMEL_REGEX)
    }
    const toCamelCase = a => {
      let result = ''
      a.forEach((el, i) => {
        const str = el.toLowerCase()
        result += i !== 0 ? str.substr(0, 1).toUpperCase() + str.substr(1) : str
      })
      return result
    }

    const arrayToCamelCase = input => {
      return input.map(el => {
        if (isArray(el)) return arrayToCamelCase(el)
        if (isString(el)) return toCamelCase(toWords(el))
        return el
      })
    }

    /**
     *
     * @param {object} obj
     * @returns {object}
     */
    const objectToCamelCase = obj => {
      for (const [key, value] of Object.entries(obj)) {
        obj[`${toCamelCase(toWords(key))}`] = isObject(value) ? objectToCamelCase(value) : value
        delete obj[key]
      }
      return obj
    }

    if (IS.array(input)) return arrayToCamelCase(input)
    if (IS.object(input)) return objectToCamelCase(input)
    if (IS.string(input)) return toCamelCase(toWords(input))

    return new TypeError('Did not recognize type. Valid Types: <array>, <object>, <string>')
  }

  static parsePath (path) {
    const a = path.split('')
    const lastI = a.length - 1
    if (a[lastI] === '/') {
      return path.slice(0, path.lastIndexOf('/'))
    } else {
      return path
    }
  }

  static getBasename (path) {
    const slashes = path.match(/\//g)
    const rawBasename =
      slashes.length >= 2
        ? path.replace(/^\//, '').split('/')[0]
        : path.replace(/^\//, '')
    return `/${rawBasename}`
  }

  static parseRoute (url) {
    let u = url === '/' ? '^(?:(\\?[^#]+))?/?$' : '^' + url + '(?:(\\?[^#]+))?/?$'
    let hasParam = false
    if (url.match(/\/:[a-zA-Z0-9]+/g)) {
      hasParam = true
      const urlArray = url.match(/\/:[a-zA-Z0-9]+/g)
      console.log(urlArray)
      urlArray.forEach(p => {
        const param = p.replace('/:', '')
        u = u.replace(p, `(?:/(?<${param}>[^/#\\?]+?))`)
      })
    } else {
      hasParam = false
    }
    console.log(new RegExp(u, 'i'))
    return {
      regexp: new RegExp(u, 'i'),
      params: hasParam
    }
  }

  /**
   *
   * @param {string[]} arr
   * @param {function} cb
   * @returns {Promise<any[]>}
   */
  static promiseMapAll (arr, cb) {
    return cb.length === 2
      ? Promise.all(arr.map(async (item, id) => await cb(item, id)))
      : Promise.all(arr.map(async item => await cb(item)))
  }

  /**
   *
   * @param {string[]} arr
   * @param {function} cb
   * @returns {Promise<any[]>}
   */
  static promiseMapAny (arr, cb) {
    return cb.length === 2
      ? Promise.any(arr.map(async (item, id) => await cb(item, id)))
      : Promise.any(arr.map(async item => await cb(item)))
  }

  static async asyncSortObjects (arr, keyOfObj) {
    const compareArray = await utils.promiseMapAll(arr, async (x) => [await x[keyOfObj], x])
    compareArray.sort((a, b) => +(a[0] < b[0]) || -(a[0] > b[0]))
    return compareArray.map(x => x[1])
  }
}
