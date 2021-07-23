import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { until } from '../op/until.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    until(...stop: Array<AsyncIterable<any> | Promise<any>>): AsyncStream<T>
  }
}

AsyncStream.prototype.until = function (...stop) {
  return stream(until(this, ...stop))
}
