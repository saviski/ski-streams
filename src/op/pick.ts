import { map } from './map.js'
import { HasAsyngIterator } from '../async-stream.js'

export function pick<T>(
  source: HasAsyngIterator<T>,
  property: keyof T,
  cached = true
): AsyncGenerator<T[typeof property]> {
  const cacheKey = 'get:' + String(property)
  return (
    (cached && source[cacheKey]) ||
    (source[cacheKey] = map(source, data => data[property]))
  )
}
