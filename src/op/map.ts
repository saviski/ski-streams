export async function* map<T, U>(
  source: AsyncIterable<T>,
  next: (v: T, index: number) => U,
  index = 0
): AsyncIterable<U> {
  for await (const value of source) yield next(value, index++)
}
