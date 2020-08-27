import { AsyncStream } from '../async-stream.js'
import { from } from './from.js'
import { until } from '../op/until.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    until(...events: Array<AsyncGenerator<any> | Promise<any>>): AsyncStream<T>
  }
}

AsyncStream.prototype.until = function (...events) {
  return from(until(this, ...events))
}
