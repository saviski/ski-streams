import { AsyncStream } from '../async-stream'
import { from } from './from'
import { until } from '../op/until'

declare module '../async-stream' {
  interface AsyncStream<T> {
    until(...events: Array<AsyncGenerator<any> | Promise<any>>): AsyncStream<T>
  }
}

AsyncStream.prototype.until = function (...events) {
  return from(until(this, ...events))
}
