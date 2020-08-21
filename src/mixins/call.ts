import { AsyncStream } from '../async-stream'
import { from } from './from'
import { call } from '../op/call'

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
