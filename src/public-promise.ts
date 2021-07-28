export class PublicPromise<T> extends Promise<T> {
  //
  public resolve: (value: T | PromiseLike<T>) => void
  public reject: (reason?: any) => void

  constructor()
  constructor(executor = (_r, _j) => {}) {
    let resolve, reject
    super((r, j) => {
      resolve = r
      reject = j
      // Promise requires you to accept an executor parameter on the constructor and to call it
      return executor(r, j)
    })

    this.resolve = resolve
    this.reject = reject
  }
}
