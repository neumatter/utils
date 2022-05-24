
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
  static asyncSortObjects: (arr: string[], keyOfObj: string) => Promise<string[]>

  static each: (array:Array<any>, callback:(element: any, index: number) => void) => Array<any>
  static map: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static pack: (array:Array<any>, callback:(element: any, index: number) => any) => Promise<Array<any>>
  static reduce: (array:Array<any>, callback:(element: any, index: number) => void, output: any) => any
  static toObject: (array:Array<any>, key: string) => object
  static filter: (array:Array<any>, callback:(element: any, index: number) => any) => Array<any>
  static range: (array:Array<any>, start: number, end: number) => Array<any>
}

export = utils
