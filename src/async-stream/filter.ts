import { AsyncStream } from '../async-stream.js'
import { filter, filterValue } from '../op/filter.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    filter<U = T>(next?: (v: T, index: number) => boolean, index?: number): AsyncStream<U>
    filter<U extends T>(next?: (v: T, index: number) => v is U, index?: number): AsyncStream<U>
    filterValue<U extends T>(value: U): AsyncStream<U>
  }
}

AsyncStream.define('filter', filter)
AsyncStream.define('filterValue', filterValue)
