
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
}
