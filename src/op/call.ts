import { map } from './map.js'
import { clone } from './clone.js'
import { HasAsyngIterator } from '../async-stream.js'

export function call<T, R>(
  source: HasAsyngIterator<T>,
  method: keyof T,
  wrap = clone,
  ...args
): AsyncGenerator<R> {
  return wrap(
    map<T, any>(source, data => (<any>data[method])(...args))
  )
}
