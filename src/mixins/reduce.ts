import { AsyncStream } from '../async-stream'
import { from } from './from'
import { reduce } from '../op/reduce'

declare module '../async-stream' {
  interface AsyncStream<T> {
    reduce<U>(
      callbackfn: (previousValue: U, currentValue: T) => U,
      initial?: T
    ): AsyncStream<U>
  }
}

AsyncStream.prototype.reduce = function (next, initial) {
  return from(reduce(this, next, initial))
}
