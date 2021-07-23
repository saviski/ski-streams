import { AsyncStream } from '../async-stream.js'
import { map } from '../op/map.js'
import { stream } from '../stream.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    map<U>(next: (v: T, index: number) => U, index?: number): AsyncStream<U>
  }
}

AsyncStream.prototype.map = function (next, index) {
  return stream(map(this, next, index))
}
