import { AsyncStream } from '../async-stream.js'
import { from } from './from.js'
import { reduce } from '../op/reduce.js'

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
