import { clone } from './clone.js'
import { hasAsyncGenerator } from './has.js'
import { HasAsyngIterator } from '../async-stream.js'

export async function* until<T>(
  source: HasAsyngIterator<T>,
  ...events: Array<AsyncGenerator<any> | Promise<any>>
): AsyncGenerator<T> {
  const generator = clone(source)
  const stop = events.map(next => (hasAsyncGenerator(next) ? clone(next).next() : next))
  Promise.race(stop).then(() => generator.return(undefined))
  yield* generator
}
