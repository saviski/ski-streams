import { HasAsyngIterator } from '../async-stream.js'
import { spy, STREAM_VALUE } from './watch.js'

export const UNINITIALIZED = Error('UNINITIALIZED')

export function mostRecent<T>(source: HasAsyngIterator<T>): T {
  if (STREAM_VALUE.has(source)) return STREAM_VALUE.get(source)
  else {
    spy(source)
    throw UNINITIALIZED
  }
}
