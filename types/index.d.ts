
declare module '@neumatter/utils'

declare class utils {
  static camelCase: (input: any) => string
  static parsePath: (path: any) => any
  static getBasename: (path: any) => string
  static parsePrefix: (url: string) => RegExp
  static parseRoute: (url: any) => {
      regexp: RegExp
      params: Boolean
  }
  static promiseMapAll: (arr: any, cb: any) => Promise<any[]>
  static promiseMapAny: (arr: any, cb: any) => Promise<any>
  static async asyncSortObjects: (arr: string[], keyOfObj: string) => Promise<string[]>

  static each: (array:Array, callback:(element: any, index: number) => void) => Array
  static map: (array:Array, callback:(element: any, index: number) => any) => Array
  static pack: (array:Array, callback:(element: any, index: number) => any) => Promise<Array>
  static reduce: (array:Array, callback:(element: any, index: number) => void, output: any) => any
  static toObject: (array:Array, key: string) => object
  static filter: (array:Array, callback:(element: any, index: number) => any) => Array
  static range: (array:Array, start: number, end: number) => Array
}

export = utils
