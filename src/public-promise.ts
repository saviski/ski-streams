export interface PublicPromise<T> extends Promise<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export class PublicPromise<T> {
  constructor() {
    var resolve, reject
    let promise = new Promise((r, j) => {
      resolve = r
      reject = j
    })
    return Object.assign(promise, { resolve, reject }) as this
  }
}
