import { AsyncStream } from '../async-stream.js'
import { until } from '../op/until.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    until(...stop: Array<AsyncIterable<any> | Promise<any>>): AsyncStream<T>
  }
}

AsyncStream.define('until', until)
