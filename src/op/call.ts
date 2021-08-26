export async function* call<T, K extends keyof T>(
  source: AsyncIterable<T>,
  method: K,
  ...args: T[K] extends (...args: infer A) => any ? A : never
): AsyncIterable<T[K] extends (...args: any[]) => infer R ? R : never> {
  for await (const value of source as AsyncIterable<any>) yield value[method](...args)
}
