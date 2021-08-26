import { isAsyncIterable } from './op/is.js'

export abstract class AsyncStream<T> {
  abstract [Symbol.asyncIterator](): AsyncIterableIterator<T>

  protected _new<U>(source: Iterable<U | Promise<U>> | AsyncIterable<U>): AsyncStream<U> {
    return new (this.constructor as new (...args: any[]) => AsyncStream<U>)(source)
  }

  static define<
    U extends AsyncStream<any>,
    K extends keyof U,
    F extends U[K] extends (...args: any[]) => any ? U[K] : never,
    A extends Parameters<F>,
    R extends ReturnType<F> extends AsyncStream<infer R2> ? AsyncIterable<R2> : ReturnType<F>
  >(name: K & string, operator: (source: AsyncIterable<any>, ...args: A) => R) {
    //
    AsyncStream.prototype[<any>name] = function (...args: A): ReturnType<F> {
      let result = operator(this, ...args)
      return result instanceof AsyncStream ? result : isAsyncIterable(result) ? <any>this._new(result) : result
    }
  }
}
