import { AsyncStream } from '../async-stream'
import { log } from '../op/log'

declare module '../async-stream' {
  interface AsyncStream<T> {
    log(...args: any[]): void
  }
}

AsyncStream.prototype.log = function (...args) {
  log(this, ...args)
}
