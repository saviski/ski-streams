export function isAsyncIterable<T>(v: Partial<AsyncIterable<T>>): v is AsyncIterable<T>

export function isAsyncIterable<T>(v: unknown): v is AsyncIterable<T>

export function isAsyncIterable(v: unknown): boolean {
  return v instanceof Object && Symbol.asyncIterator in v
}
