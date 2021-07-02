import { HasAsyngIterator } from '../async-stream.js'

export async function* modify<T extends object>(
  source: HasAsyngIterator<T>,
  next: (v: T, index: number) => void,
  index = 0
): AsyncGenerator<T> {
  for await (const value of source) {
    next(value, index++)
    yield value
  }
}
