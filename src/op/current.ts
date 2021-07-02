import { HasAsyngIterator } from '../async-stream.js'
import { memoize, STREAM_VALUE } from './memoize.js'

export const UNINITIALIZED = Error('UNINITIALIZED')

export function current<T>(source: HasAsyngIterator<T>): T | void {
  if (STREAM_VALUE.has(source)) return STREAM_VALUE.get(source)
  else {
    memoize(source)
    // throw UNINITIALIZED
  }
}
