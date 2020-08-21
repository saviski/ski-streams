import { HasAsyngIterator } from '../async-stream.js'

export async function listen<T, U>(source: HasAsyngIterator<T>, listener: (v: T) => U) {
  for await (const value of source) listener(value)
}
