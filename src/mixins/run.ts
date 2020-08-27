import { AsyncStream } from '../async-stream.js'
import { from } from './from.js'
import { run } from '../op/run.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    run(callback: (v: T, index: number) => any, index?: number): AsyncStream<T>
  }
}

AsyncStream.prototype.run = function (callback, index?) {
  return from(run(this, callback, index))
}
