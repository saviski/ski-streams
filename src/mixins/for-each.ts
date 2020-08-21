import { AsyncStream } from '../async-stream'
import { forEach } from '../op/for-each'

declare module '../async-stream' {
  interface AsyncStream<T> {
    forEach(next: (v: T, index: number) => any, index?: number)
  }
}

AsyncStream.prototype.forEach = function (next, index) {
  forEach(this, next, index)
}
