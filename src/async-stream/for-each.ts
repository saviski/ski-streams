import { AsyncStream } from '../async-stream.js'
import { forEach } from '../op/for-each.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    forEach(next: (v: T, index: number) => any, index?: number): Promise<void>
  }
}

AsyncStream.define('forEach', forEach)
