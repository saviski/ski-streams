import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { run } from '../op/run.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    run(callback: (v: T, index: number) => any, index?: number): AsyncStream<T>
  }
}

AsyncStream.prototype.run = function (callback, index?) {
  return stream(run(this, callback, index))
}
