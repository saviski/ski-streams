import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { reduce } from '../op/reduce.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    reduce<U>(
      callbackfn: (previousValue: U, currentValue: T) => U,
      initial?: U
    ): AsyncStream<U>
  }
}

AsyncStream.prototype.reduce = function (next, initial) {
  return stream(reduce(this, next, initial))
}
