import { AsyncStream } from './async-stream.js'
import { AsyncEmitter } from './async-emitter.js'

class Stream<T> extends AsyncStream<T> {
  //
  emitter = new AsyncEmitter<T>()

  static from<T>(...values: T[]): Stream<T> {
    return new Stream<T>(
      (async function* () {
        yield* values
      })()
    )
  }

  constructor(private source: AsyncIterable<T>) {
    super()
    this.dispatch()
  }

  async dispatch() {
    for await (let value of this.source) this.emitter.yield(value)
    this.emitter.return()
  }

  [Symbol.asyncIterator](): AsyncGenerator<T> {
    return this.emitter[Symbol.asyncIterator]()
  }
}

export function stream<T>(source: AsyncIterable<T>): AsyncStream<T> {
  return source instanceof AsyncStream ? (source as AsyncStream<T>) : new Stream(source)
}

export function emit<T>(...values: T[]): AsyncStream<T> {
  return Stream.from(...values)
}
