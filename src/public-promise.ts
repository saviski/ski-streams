export class SelfPromise<T> extends Promise<T> {
  //
  protected resolve: (value: T | PromiseLike<T>) => void
  protected reject: (reason?: any) => void

  constructor(executor = (_s, _j) => {}) {
    let resolve, reject
    super((s, j) => {
      resolve = s
      reject = j
      // Promise requires you to accept an executor parameter on the constructor and call it
      return executor(s, j)
    })

    this.resolve = resolve
    this.reject = reject
  }
}

export class PublicPromise<T> extends SelfPromise<T> {}
export interface PublicPromise<T> extends SelfPromise<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function instantPromise<T>(value: T) {
  return Object.assign(Promise.resolve(value), {
    then(onfulfilled: (value: T) => any) {
      return onfulfilled(value)
    },
  })
}
