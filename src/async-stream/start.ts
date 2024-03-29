import { AsyncStream } from '../async-stream.js'
import { start } from '../op/start.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    start(value: T): AsyncStream<T>
  }
}

AsyncStream.define('start', start)
