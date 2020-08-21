import { AsyncStream } from '../async-stream'
import { find } from '../op/find'

declare module '../async-stream' {
  interface AsyncStream<T> {
    find<S extends T>(
      predicate: (value: T, index: number) => value is S,
      index?: number
    ): Promise<S>
  }
}

AsyncStream.prototype.find = function (predicate, index) {
  return find(this, predicate, index)
}
