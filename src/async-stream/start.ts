import { AsyncStream } from '../async-stream.js'
import { start } from '../op/start.js'
import { stream } from '../stream.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    start(value: T): AsyncStream<T>
  }
}

AsyncStream.prototype.start = function (value) {
  return stream(start(this, value))
}
