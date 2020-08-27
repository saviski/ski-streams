import { HasAsyngIterator, AsyncStream } from '../async-stream.js'
import { clone } from '../op/clone.js'

export function from<T>(source: HasAsyngIterator<T>): AsyncStream<T> {
  return Object.create(
    AsyncStream.prototype,
    Object.getOwnPropertyDescriptors(clone(source))
  )
}
