import { AsyncStream } from '../async-stream.js'
import { pick } from '../op/pick.js'
import { from } from './from.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    pick(key: keyof T, cached?: boolean): AsyncGenerator<T[typeof key]>
  }
}

AsyncStream.prototype.pick = function (key, cached?) {
  return from(pick(this, key, cached))
}
