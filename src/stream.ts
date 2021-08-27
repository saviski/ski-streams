import { AsyncStream } from './async-stream.js'
import { AsyncEmitter } from './async-emitter.js'
import { isAsyncIterable } from './op/is.js'

class AsyncIterableStream<T> extends AsyncStream<T> {
  //
  private emitter = new AsyncEmitter<T>()

  constructor(public source: Iterable<T | Promise<T>> | AsyncIterable<T>) {
    super()
    this.dispatch(source)
  }

  private async dispatch(source: Iterable<T | Promise<T>> | AsyncIterable<T>) {
    isAsyncIterable(source) ? await this.emitter.async(source) : this.emitter.pushMany(source)
    this.emitter.return()
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this.emitter[Symbol.asyncIterator]()
  }
}

// class SyncIterableStream<T> extends AsyncStream<T> {
//   constructor(private source: Iterable<T>) {
//     super()
//   }

//   protected _new<U>(source: Iterable<U | Promise<U>> | AsyncIterable<U>): AsyncStream<U> {
//     return Symbol.iterator in source ? new SyncIterableStream(source as Iterable<U>) : new AsyncIterableStream(source)
//   }

//   [Symbol.asyncIterator](): AsyncIterableIterator<T> {
//     let iterator = this.source[Symbol.iterator]()
//     return {
//       next(n: any) {
//         return instantPromise(iterator.next(n))
//       },
//       [Symbol.asyncIterator]: () => this[Symbol.asyncIterator](),
//     }
//   }
// }

export function stream<T>(source: Iterable<T | Promise<T>> | AsyncIterable<T>): AsyncStream<T> {
  return source instanceof AsyncStream ? source : new AsyncIterableStream(source)
}

// export function emit<T>(source: Iterable<T>): AsyncStream<T> {
//   return new SyncIterableStream(source)
// }
