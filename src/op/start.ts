export async function* start<T>(source: AsyncIterable<T>, value: T): AsyncIterable<T> {
  yield value
  yield* source
}
