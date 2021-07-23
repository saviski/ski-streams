import { AsyncStream } from '../async-stream.js'
import { log } from '../op/log.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    log(...args: any[]): void
  }
}

AsyncStream.prototype.log = function (...args) {
  log(this, ...args)
}
