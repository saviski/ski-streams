import { map } from './map.js'

export function call<T, K extends keyof T>(
  source: AsyncIterable<T>,
  method: K,
  ...args: T[K] extends (...args: infer A) => any ? A : never
): AsyncIterable<T[K] extends (...args: any[]) => infer R ? R : never> {
  return map<T, any>(source, data => (<any>data[method])(...args))
}
