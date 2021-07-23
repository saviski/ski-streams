export async function* pick<T, K extends keyof T>(source: AsyncIterable<T>, property: K): AsyncIterable<T[K]> {
  for await (const data of source) yield data[property]
}
