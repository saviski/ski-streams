import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { call } from '../op/call.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    call<K extends keyof T>(
      key: K,
      ...args: T[K] extends (...args: infer A) => any ? A : never
    ): AsyncStream<T[K] extends (...args: any[]) => infer R ? R : never>
  }
}

AsyncStream.prototype.call = function (key, ...args) {
  return stream(call(this, key, stream, ...args))
}
