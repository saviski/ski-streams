import { AsyncStream } from '../async-stream'
import { start } from '../op/start'
import { from } from './from'

declare module '../async-stream' {
  interface AsyncStream<T> {
    start(value: T): AsyncStream<T>
  }
}

AsyncStream.prototype.start = function (value) {
  return from(start(this, value))
}
