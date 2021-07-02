export async function* emit<T>(value: T): AsyncGenerator<T> {
  yield value
}
