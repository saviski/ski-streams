import { AsyncStream } from '../async-stream'
import { from } from './from'
import { run } from '../op/run'

declare module '../async-stream' {
  interface AsyncStream<T> {
    run(callback: (v: T, index: number) => any, index?: number): AsyncStream<T>
  }
}

AsyncStream.prototype.run = function (callback, index?) {
  return from(run(this, callback, index))
}
