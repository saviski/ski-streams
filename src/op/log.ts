import { HasAsyngIterator } from '../async-stream.js'

export async function log<T>(source: HasAsyngIterator<T>, ...args: any[]) {
  let index = 0
  for await (const value of source) console.log(++index + 'º', ...args, value)
}
