
/**
 * 
 * @type {import('./types/index').default}
 */
class utils {
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

    if (isArray(input)) return arrayToCamelCase(input)
    if (isObject(input)) return objectToCamelCase(input)
    if (isString(input)) return toCamelCase(toWords(input))

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

  /**
   *
   * @param {Array} array
   * @param {(element: any, index: number) => void} callback Function to run on each element in set.
   */
   static each (array, callback) {
    const { length } = array
    let index = -1
    while (++index < length) {
      callback(array[index], index, array)
    }
    return array
  }

  static map (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return output
  }

  static pack (array, callback) {
    const { length } = array
    const output = new Array(length)
    let index = -1
    while (++index < length) {
      output[index] = callback(array[index], index)
    }
    return Promise.all(output)
  }

  static reduce (array, callback, output) {
    const length = array.length
    let index = -1
    while (++index < length) {
      output = callback(output, array[index], index)
    }
    return output
  }

  static toObject (array, key) {
    const output = {}
    const length = array.length
    let index = -1
    while (++index < length) {
      if (key) output[array[index][key]] = array[index]
      else output[index] = array[index]
    }
    return output
  }

  static filter (array, callback) {
    const length = array.length
    const output = []
    let outputIndex = -1
    let index = -1
    while (++index < length) {
      if (callback(array[index], index)) {
        ++outputIndex
        output[outputIndex] = array[index]
      }
    }
    return output
  }

  /**
   *
   * @param {number} start index of the first element to be returned
   * @param {number} end index of the last element to be returned
   * @returns {string[]} copy of values within range
   */
  static range (array, start, end) {
    end += 1
    const length = end - start
    console.log(length)
    let index = start - 1
    let id = -1
    const output = []
    while (++index < end) {
      output[++id] = array[index]
    }
    return output
  }
}

module.exports = utils
