import { AsyncStream } from '../async-stream.js'
import { emit } from '../op/emit.js'
import { stream } from '../stream.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    emit(value: T): AsyncStream<T>
  }
}

AsyncStream.prototype.emit = function (value) {
  return stream(emit(value))
}
