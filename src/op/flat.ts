import { isAsyncIterable } from './is.js'

export async function* flat<T>(source: AsyncIterable<T>): AsyncIterable<T> {
  for await (const value of source) isAsyncIterable<T>(value) ? yield* value : yield value
}
