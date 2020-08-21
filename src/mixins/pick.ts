import { AsyncStream } from '../async-stream'
import { pick } from '../op/pick'
import { from } from './from'

declare module '../async-stream' {
  interface AsyncStream<T> {
    pick(key: keyof T, cached?: boolean): AsyncGenerator<T[typeof key]>
  }
}

AsyncStream.prototype.pick = function (key, cached?) {
  return from(pick(this, key, cached))
}
