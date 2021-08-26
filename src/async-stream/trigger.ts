import { AsyncStream } from '../async-stream.js'
import { trigger } from '../op/trigger.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    trigger<R, U>(factory: (this: U, v: T) => AsyncIterable<R>, context?: U): AsyncStream<R>
  }
}

AsyncStream.define('trigger', trigger)
