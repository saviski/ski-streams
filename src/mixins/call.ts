import { AsyncStream } from '../async-stream.js'
import { from } from './from.js'
import { call } from '../op/call.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    call<K extends keyof T>(
      key: K,
      ...args
    ): AsyncGenerator<ReturnType<T[K] extends (...a) => any ? T[K] : never>>
  }
}

AsyncStream.prototype.call = function (key, ...args) {
  return call(this, key, from, ...args)
}
