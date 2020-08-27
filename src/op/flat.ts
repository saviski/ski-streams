import { hasAsyncGenerator } from './has.js'
import { HasAsyngIterator } from '../async-stream.js'

export async function* flat<T>(source: HasAsyngIterator<T>): AsyncGenerator<T> {
  for await (const value of source)
    hasAsyncGenerator<T>(value) ? yield* value : yield value
}
