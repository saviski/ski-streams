import { AsyncStream } from '../async-stream.js'
import { pick } from '../op/pick.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    pick<K extends keyof T>(key: K): AsyncStream<T[K]>
  }
}

AsyncStream.define('pick', pick)
