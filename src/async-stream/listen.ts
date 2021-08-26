import { AsyncStream } from '../async-stream.js'
import { listen } from '../op/listen.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    listen(next: (v: T) => any, index?: number): Promise<void>
  }
}

AsyncStream.define('listen', listen)
