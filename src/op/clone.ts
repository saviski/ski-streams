import { DONE, HasAsyngIterator } from '../async-stream.js'

export function clone<U extends HasAsyngIterator<any>>(
  source: U
): U extends HasAsyngIterator<infer T> ? U & AsyncGenerator<T> : never {
  let result = Object.create(source)
  const getnext = shareNext(source[Symbol.asyncIterator]())

  const done = new Promise<IteratorResult<any, void>>((resolve, reject) => {
    Object.assign(result, {
      next() {
        return Promise.race([getnext(), done])
      },
      return(v) {
        resolve(v)
        return DONE
      },
      throw(r) {
        reject(r)
        return DONE
      },
      [Symbol.asyncIterator]() {
        return this
      },
    })
  }).then(() => DONE)

  return result!
}

function shareNext<T>(generator: AsyncGenerator<T, any, unknown>) {
  let next = getNext()

  function getNext(): Promise<IteratorResult<T, any>> {
    next = generator.next()
    next.then(value => {
      !value.done && getNext()
    })
    return next
  }

  return () => next
}
