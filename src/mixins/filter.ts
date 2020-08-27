import { AsyncStream } from '../async-stream.js'
import { filter, filterValue } from '../op/filter.js'
import { from } from './from.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    filter<U>(next?: (v: T, index: number) => boolean, index?: number): AsyncStream<U>
    filter<U extends T>(
      next?: (v: T, index: number) => v is U,
      index?: number
    ): AsyncStream<U>
    filter<U extends T>(value: U): AsyncStream<U>
  }
}

AsyncStream.prototype.filter = function (test, index?) {
  return from(
    typeof test == 'function' ? filter(this, test, index) : filterValue(this, test)
  )
}
