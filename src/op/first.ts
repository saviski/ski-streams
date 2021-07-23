export function first<T>(source: AsyncIterable<T>): Promise<T> {
  return source[Symbol.asyncIterator]()
    .next()
    .then(({ value }) => <T>value)
}
