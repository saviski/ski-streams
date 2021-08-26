import { AsyncStream } from '../async-stream.js'
import { map } from '../op/map.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    map<U>(next: (v: T, index: number) => U, index?: number): AsyncStream<U>
  }
}

AsyncStream.define('map', map)
