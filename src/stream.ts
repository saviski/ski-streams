import { HasAsyngIterator, AsyncStream } from './async-stream.js'
import { clone } from './op/clone.js'

class Stream<T> extends AsyncStream<T> {
  constructor(private source: AsyncGenerator<T>) {
    super()
  }

  [Symbol.asyncIterator] = () => this.source
}

export function stream<T>(source: HasAsyngIterator<T>): AsyncStream<T> {
  return new Stream(clone(source))
}
