import { AsyncStream } from '../async-stream.js'
import { first } from '../op/first.js'

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
