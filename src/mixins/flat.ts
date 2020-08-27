import { AsyncStream } from '../async-stream.js'
import { from } from './from.js'
import { flat } from '../op/flat.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    flat: AsyncGenerator<T>
  }
}

Object.defineProperties(AsyncStream, {
  flat: {
    get() {
      return from(flat(this))
    },
  },
})
