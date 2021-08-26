import { AsyncStream } from '../async-stream.js'
import { run } from '../op/run.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    run(callback: (v: T, index: number) => any, index?: number): AsyncStream<T>
  }
}

AsyncStream.define('run', run)
