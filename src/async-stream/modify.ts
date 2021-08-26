import { AsyncStream } from '../async-stream.js'
import { modify } from '../op/modify.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    modify(next: (v: T, index: number) => void, index?: number): AsyncStream<T>
  }
}

AsyncStream.define('modify', modify)
