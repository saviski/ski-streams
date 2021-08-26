import { AsyncStream } from '../async-stream.js'
import { memoize, Memoized } from '../op/memoize.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    memoize(): AsyncStream<T> & Memoized<T>
  }
}

AsyncStream.define('memoize', memoize)
