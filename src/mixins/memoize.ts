import { AsyncStream } from '../async-stream.js'
import { HasAsyngIterator } from '../async-stream.js'
import { memoize } from '../op/memoize.js'
import { current } from '../op/current.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    memoize(): this & { current?: T }
  }
}

AsyncStream.prototype.memoize = function () {
  memoize(this)
  return <any>this
}

Object.defineProperty(AsyncStream.prototype, 'current', {
  get<T extends object>(this: HasAsyngIterator<T>) {
    return current(this)
  },
})
