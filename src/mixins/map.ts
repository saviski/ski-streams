import { AsyncStream } from '../async-stream'
import { map } from '../op/map'
import { from } from './from'

declare module '../async-stream' {
  interface AsyncStream<T> {
    map<U>(next: (v: T, index: number) => U, index?: number): AsyncStream<U>
  }
}

AsyncStream.prototype.map = function (next, index) {
  return from(map(this, next, index))
}
