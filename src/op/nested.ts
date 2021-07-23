export function nested<T1, R>(source: AsyncIterable<T1>, g1: (v0: T1) => AsyncIterable<R>): AsyncIterable<R>

export function nested<T1, T2, R>(
  source: AsyncIterable<T1>,
  g1: (v0: T1) => AsyncIterable<T2>,
  g2: (v0: T1, v1: T2) => AsyncIterable<R>
): AsyncIterable<R>

export function nested<T1, T2, T3, R>(
  source: AsyncIterable<T1>,
  g1: (v0: T1) => AsyncIterable<T2>,
  g2: (v0: T1, v1: T2) => AsyncIterable<T3>,
  g3: (v0: T1, v1: T2, v3: T3) => AsyncIterable<R>
): AsyncIterable<R>

export function nested<T extends any[]>(
  source: AsyncIterable<T[0]>,
  ...gen: Array<(...v: T) => AsyncIterable<any>>
): AsyncIterable<T[-1]>

export async function* nested(
  source: AsyncIterable<any>,
  ...sources: Array<(...v) => AsyncIterable<any>>
): AsyncIterable<any> {
  let generators = [source[Symbol.asyncIterator]()]
  let promises: Array<Promise<IteratorResult<unknown>> | undefined> = [generators[0].next()]
  let values: any[] = []

  while (promises.some(Boolean)) {
    let [index, value, done] = <[number, any, boolean]>(
      await Promise.race(
        promises.map((promise, i) => promise?.then(result => [i, result.value, result.done])).filter(Boolean)
      )
    )

    if (!done || value !== undefined) {
      if (index == sources.length) yield value
      else {
        values[index] = value
        for (let next = index + 1; next <= sources.length; next++) {
          generators[next]?.return?.(undefined)
          promises[next] = undefined
        }
        generators[index + 1] = sources[index](...values)[Symbol.asyncIterator]()
        promises[index + 1] = generators[index + 1].next()
      }
    }
    promises[index] = done ? undefined : generators[index].next()
  }
}
