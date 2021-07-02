import { AsyncStream } from '../async-stream.js'
import { modify } from '../op/modify.js'
import { stream } from '../stream.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    modify(next: (v: T, index: number) => void, index?: number): AsyncStream<T>
  }
}

AsyncStream.prototype.modify = function (next, index) {
  return stream(modify(this, next, index))
}
