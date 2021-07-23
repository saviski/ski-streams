import { AsyncEmitter } from '../async-emitter.js'

export const UNINITIALIZED = Error('UNINITIALIZED')

export class MemoizedStream<T> extends AsyncEmitter<T> {
  private val: any = UNINITIALIZED

  constructor(private generator: AsyncIterable<T>, value?: T) {
    super()
    if (value) this.val = value
    this.consume()
  }

  get value(): T {
    if (this.val == UNINITIALIZED) throw this.val
    return this.val
  }

  async consume() {
    for await (let value of this.generator) {
      this.yield((this.val = value))
    }
  }
}

export function memoize<T>(source: AsyncIterable<T>): MemoizedStream<T> {
  return new MemoizedStream<T>(source)
}
