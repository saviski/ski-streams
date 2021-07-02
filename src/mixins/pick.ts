import { AsyncStream } from '../async-stream.js'
import { pick } from '../op/pick.js'
import { stream } from '../stream.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    pick<K extends keyof T>(key: K, cached?: boolean): AsyncStream<T[K]>
  }
}

AsyncStream.prototype.pick = function (key, cached?) {
  return stream(pick(this, key, cached))
}
