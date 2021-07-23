export async function* reduce<T, U>(
  source: AsyncIterable<T>,
  callbackfn: (previousValue: U, currentValue: T) => U,
  initial?: U
): AsyncIterable<U> {
  let previous = initial ?? (await source[Symbol.asyncIterator]().next()).value
  for await (const value of source) yield (previous = callbackfn(previous, value))
}
