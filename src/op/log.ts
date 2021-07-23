export async function log<T>(source: AsyncIterable<T>, ...args: any[]) {
  let index = 0
  for await (const value of source) console.log(++index + 'º', ...args, value)
}
