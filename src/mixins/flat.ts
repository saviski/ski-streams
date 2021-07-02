import { AsyncStream } from '../async-stream.js'
import { stream } from '../stream.js'
import { flat } from '../op/flat.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    flat: AsyncGenerator<T>
  }
}

Object.defineProperties(AsyncStream, {
  flat: {
    get() {
      return stream(flat(this))
    },
  },
})
