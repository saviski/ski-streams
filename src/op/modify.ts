export async function* modify<T extends object>(
  source: AsyncIterable<T>,
  next: (v: T, index: number) => void,
  index = 0
): AsyncIterable<T> {
  for await (const value of source) {
    next(value, index++)
    yield value
  }
}
