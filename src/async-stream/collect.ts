import { AsyncStream } from '../async-stream.js'
import { collect } from '../op/collect.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    collect(): Promise<T[]>
  }
}

AsyncStream.define('collect', collect)
