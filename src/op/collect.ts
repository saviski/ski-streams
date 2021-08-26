export async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  let list: T[] = []
  for await (let value of source) list.push(value)
  return list
}
