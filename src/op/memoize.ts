import { AsyncStream } from '../async-stream.js'

export const UNINITIALIZED = new Error('UNINITIALIZED')

export interface Memoized<T> {
  value: T
}

class Memoize<T> extends AsyncStream<T> implements Memoized<T> {
  constructor(private source: AsyncIterable<T>) {
    super()
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T> {
    for await (let value of this.source) {
      this.value = value
      yield value
    }
  }

  set value(value) {
    Object.defineProperty(this, 'value', { value, writable: true })
  }

  get value(): T {
    throw UNINITIALIZED
  }
}

export function memoize<T>(source: AsyncIterable<T>) {
  return new Memoize(source)
}
