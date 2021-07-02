import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { until } from '../op/until.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    until(...events: Array<AsyncGenerator<any> | Promise<any>>): AsyncStream<T>
  }
}

AsyncStream.prototype.until = function (...events) {
  return stream(until(this, ...events))
}
