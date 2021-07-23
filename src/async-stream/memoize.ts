import { AsyncStream } from '../async-stream.js'
import { memoize, MemoizedStream } from '../op/memoize.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    memoize(): MemoizedStream<T>
  }
}

AsyncStream.prototype.memoize = function () {
  return memoize(this)
}
