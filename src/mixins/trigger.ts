import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { trigger } from '../op/trigger.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    trigger<R>(target: AsyncGenerator<R>): AsyncStream<R>
    trigger<R>(factory: (v: T) => AsyncGenerator<R>): AsyncStream<R>
  }
}

AsyncStream.prototype.trigger = function (factory) {
  return stream(trigger(this, factory))
}
