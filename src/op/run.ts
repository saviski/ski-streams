export async function* run<T>(
  source: AsyncIterable<T>,
  callback: (value: T, index: number) => any,
  index = 0
): AsyncIterable<T> {
  for await (const value of source) {
    callback(value, index++)
    yield value
  }
}
