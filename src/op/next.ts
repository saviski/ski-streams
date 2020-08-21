import { HasAsyngIterator } from '../async-stream.js'

const STREAM_PROMISE = new WeakMap<HasAsyngIterator<any>, Promise<any>>()

export async function next<T>(source: HasAsyngIterator<T>): Promise<IteratorResult<T>> {
  STREAM_PROMISE.has(source) || observeStreamPromises(source)
  return STREAM_PROMISE.get(source)
}

async function observeStreamPromises(source: HasAsyngIterator<any>) {
  const stream = source[Symbol.asyncIterator]()
  do {
    let promise = stream.next()
    STREAM_PROMISE.set(source, promise)
    var data = await promise
  } while (!data.done)
}
