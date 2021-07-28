import { AsyncStream } from './async-stream.js'
import { AsyncEmitter } from './async-emitter.js'

class Stream<T> extends AsyncStream<T> {
  //
  emitter = new AsyncEmitter<T>()

  constructor(private source: Iterable<T> | AsyncIterable<T>) {
    super()
    this.dispatch()
  }

  async dispatch() {
    await this.emitter.yieldManyAsync(this.source)
    this.emitter.return()
  }

  [Symbol.asyncIterator](): AsyncGenerator<T> {
    return this.emitter[Symbol.asyncIterator]()
  }
}

export function stream<T>(source: Iterable<T> | AsyncIterable<T>): AsyncStream<T> {
  return source instanceof AsyncStream ? (source as AsyncStream<T>) : new Stream(source)
}

export function emit<T>(...values: T[]): AsyncStream<T> {
  return new Stream(values)
}
