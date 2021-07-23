export async function* until<T>(
  source: AsyncIterable<T>,
  ...stop: Array<AsyncIterable<any> | Promise<any>>
): AsyncIterable<T> {
  const stopCondiction = stop.map<Promise<unknown>>(event => event[Symbol.asyncIterator]?.().next() ?? event)

  var finished = false
  Promise.race(stopCondiction).finally(() => (finished = true))

  for await (let value of source) {
    if (finished) return
    yield value
  }
}
