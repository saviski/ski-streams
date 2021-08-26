import { AsyncStream } from '../async-stream.js'
import { flat } from '../op/flat.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    flat(): AsyncStream<T>
  }
}

AsyncStream.define('flat', flat)
