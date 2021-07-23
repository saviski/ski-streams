import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { trigger } from '../op/trigger.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    trigger<R, U>(factory: (this: U, v: T) => AsyncIterable<R>, context?: U): AsyncStream<R>
  }
}

AsyncStream.prototype.trigger = function (factory, context?) {
  return stream(trigger(this, factory, context))
}
