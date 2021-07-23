import { AsyncStream } from '../async-stream.js'
import { then } from '../op/then.js'

declare module '../async-stream' {
  interface AsyncStream<T> {
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2>
  }
}

AsyncStream.prototype.then = function (onfulfilled, onrejected) {
  return then(this, onfulfilled, onrejected)
}
