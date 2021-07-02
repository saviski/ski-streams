import { AsyncStream } from '../async-stream.js'
import { forEach } from '../op/for-each.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    forEach(next: (v: T, index: number) => any, index?: number): this
  }
}

AsyncStream.prototype.forEach = function (next, index) {
  forEach(this, next, index)
  return this
}
