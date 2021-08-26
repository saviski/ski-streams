import { AsyncStream } from '../async-stream.js'
import { find } from '../op/find.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    find<S extends T>(predicate: (value: T, index: number) => value is S, index?: number): Promise<S>
  }
}

AsyncStream.define('find', find)
