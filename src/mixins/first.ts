import { AsyncStream } from '../async-stream'
import { first } from '../op/first'

declare module '../async-stream' {
  interface AsyncStream<T> {
    first: Promise<T>
  }
}

Object.defineProperties(AsyncStream, {
  first: {
    get() {
      return first(this)
    },
  },
})
