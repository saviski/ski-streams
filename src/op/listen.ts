export async function listen<T, U>(source: AsyncIterable<T>, listener: (v: T) => U) {
  for await (const value of source) listener(value)
}
