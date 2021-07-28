import { PublicPromise } from './public-promise.js'

interface Chain<T> {
  value: T
  next?: Chain<T>
}

export class AsyncEmitter<T = any> extends PublicPromise<T | void> {
  //
  enabled = false

  private resolver = this.create()

  create() {
    return { value: new PublicPromise<Iterable<T> | AsyncIterable<T>>() }
  }

  getnext(
    generator: Chain<PublicPromise<Iterable<T> | AsyncIterable<T>>>
  ): Chain<PublicPromise<Iterable<T> | AsyncIterable<T>>> {
    return generator.next || (generator.next = this.create())
  }

  private async *_asyncGenerator(): AsyncGenerator<T, any, any> {
    let generator = this.resolver
    this.enabled = true
    while (this.enabled) {
      let promise = generator.value
      yield* await promise
      generator = this.getnext(generator)
    }
  }

  [Symbol.asyncIterator](): AsyncGenerator<T> {
    const generator = this._asyncGenerator()
    return {
      next: (value: any) => generator.next(value),
      [Symbol.asyncIterator]: () => this[Symbol.asyncIterator](),
      return: (value?: T) => this.return(value),
      throw: (error: any) => this.throw(error),
    }
  }

  yield(value: T) {
    return this.yieldMany([value])
  }

  yieldMany(values: Iterable<T> | AsyncIterable<T>) {
    if (this.enabled) {
      this.resolver.value.resolve(values)
      this.resolver = this.getnext(this.resolver)
    }
  }

  async yieldManyAsync(values: Iterable<T> | AsyncIterable<T>) {
    for await (let value of values) this.yield(value)
  }

  async return(value?: T) {
    this.enabled = false
    this.resolver.value.resolve(value ? [value] : [])
    this.resolve(value)
    return { value, done: true } as IteratorReturnResult<T | undefined>
  }

  async throw(error: any) {
    this.resolver.value.reject(error)
    this.reject(error)
    return { value: undefined, done: true } as IteratorReturnResult<undefined>
  }
}
