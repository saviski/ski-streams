export type asyncIterator = typeof Symbol.asyncIterator

export const asyncIterator: asyncIterator = Symbol.asyncIterator

export abstract class AsyncStream<T> {
  abstract [asyncIterator](): AsyncGenerator<T>
}
