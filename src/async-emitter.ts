import { SelfPromise, PublicPromise } from './public-promise.js'

interface Chain<T> {
  value: T
  done?: true
  next?: Chain<T>
}

type Iter<T> = Iterable<T | Promise<T>>
type IterChain<T> = Chain<PublicPromise<Iter<T>>>

export class AsyncEmitter<T = any> extends SelfPromise<T | void> {
  //
  private tail: IterChain<T> = this.newlink()
  private head?: IterChain<T> = this.tail

  private newlink(): IterChain<T> {
    return { value: new PublicPromise<Iter<T>>() }
  }

  private getnext(generator: IterChain<T>) {
    return generator.done ? generator : (generator.next ??= this.newlink())
  }

  private async *_next(node: IterChain<T>) {
    let value = await node.value
    while (!node.done) {
      console.log('emittter', value)
      yield* value
      node = this.getnext(node)
      value = await node.value
    }
  }

  [Symbol.asyncIterator](): AsyncGenerator<T> {
    const generator = this._next(this.head || this.tail)
    return {
      [Symbol.asyncIterator]: () => this[Symbol.asyncIterator](),
      next: () => generator.next(),
      return: (value?: T) => this.return(value),
      throw: (error: any) => this.throw(error),
    }
  }

  yield(value: T) {
    return this.yieldMany([value])
  }

  yieldMany(values: Iter<T>) {
    delete this.head
    this.tail.value.resolve(values)
    this.tail = this.getnext(this.tail)
  }

  async async(values: AsyncIterable<T>) {
    for await (let value of values) this.push(value)
  }

  push(value: T) {
    this.pushMany([value])
  }

  async pushMany(values: Iter<T>) {
    this.head ??= this.tail
    this.tail.value.resolve(values)
    this.tail = this.getnext(this.tail)
  }

  async return(value?: T) {
    this.tail.done = true
    this.tail.value.resolve([value!])
    this.resolve(value)
    return { value, done: true } as IteratorReturnResult<T | undefined>
  }

  async throw(error: any) {
    this.tail.done = true
    this.tail.value.reject(error)
    this.reject(error)
    return { value: undefined, done: true } as IteratorReturnResult<undefined>
  }
}
