import { AsyncStream } from '../async-stream.js'
import { listen } from '../op/listen.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    listen(next: (v: T) => any, index?: number)
  }
}

AsyncStream.prototype.listen = function (next) {
  listen(this, next)
}
