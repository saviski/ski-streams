import { AsyncStream } from '../async-stream'
import { from } from './from'
import { flat } from '../op/flat'

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
