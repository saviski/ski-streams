import { PublicPromise } from './public-promise.js'

interface Chain<T> {
  value: T
  next?: Chain<T>
}

export class AsyncEmitter<T = any> {
  //
  private resolver = this.create()
  enabled = false

  create() {
    return { value: new PublicPromise<T[]>() }
  }

  getnext(generator: Chain<PublicPromise<T[]>>): Chain<PublicPromise<T[]>> {
    return generator.next || (generator.next = this.create())
  }

  private async *newAsyncGenerator(): AsyncGenerator<T, any, any> {
    let generator = this.resolver
    this.enabled = true
    while (this.enabled) {
      let promise = generator.value
      yield* await promise
      generator = this.getnext(generator)
    }
  }

  [Symbol.asyncIterator](): AsyncGenerator<T> {
    return Object.assign(this.newAsyncGenerator(), {
      [Symbol.asyncIterator]: () => this[Symbol.asyncIterator](),
    })
  }

  yield(...values: T[]): this {
    if (this.enabled) {
      this.resolver.value.resolve(values)
      this.resolver = this.getnext(this.resolver)
    }
    return this
  }

  return(value?: T) {
    this.enabled = false
    this.resolver.value.resolve(value ? [value] : [])
  }

  throw(error: any) {
    this.resolver.value.reject(error)
  }
}
