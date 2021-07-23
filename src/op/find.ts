export async function find<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S,
  index = 0
): Promise<S> {
  for await (const value of source) if (predicate(value, index++)) return value
  return new Promise(() => {})
}
