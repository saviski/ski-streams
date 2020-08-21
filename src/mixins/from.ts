import { HasAsyngIterator, AsyncStream } from '../async-stream'
import { clone } from '../op/clone'

export function from<T>(source: HasAsyngIterator<T>): AsyncStream<T> {
  return Object.create(
    AsyncStream.prototype,
    Object.getOwnPropertyDescriptors(clone(source))
  )
}
