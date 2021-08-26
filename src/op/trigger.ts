const FOREVER = new Promise<any>(() => {})

enum Trigger {
  SIGNAL,
  DATA,
}

export function trigger<T, U, This = any>(
  source: AsyncIterable<T>,
  emitter: (this: This, v: T) => AsyncIterable<U>,
  context?: This
): AsyncIterable<U> {
  const signals = source[Symbol.asyncIterator]()
  let iterable: AsyncIterable<U>
  let iterator: AsyncIterator<U>

  let signal = next(signals, Trigger.SIGNAL)
  let future: Promise<{ type: Trigger; done?: boolean; value: any }> = FOREVER
  let finished = 0

  return asyncGenerator()

  function create(value) {
    return emitter.call(context!, value)
  }

  function next(asynciterator: AsyncIterator<any>, type: Trigger) {
    return asynciterator.next().then(s => ({ ...s, type }))
  }

  async function* asyncGenerator() {
    while (finished < 2) {
      let { value, done, type } = await Promise.race([signal, future])

      if (type == Trigger.SIGNAL) {
        if (done) {
          finished++
          signal = FOREVER
        } else {
          iterable = create(value)
          iterator = iterable[Symbol.asyncIterator]()
          future = next(iterator, Trigger.DATA)
          signal = next(signals, Trigger.SIGNAL)
        }
      } else if (type == Trigger.DATA) {
        if (done) {
          finished++
          future = FOREVER
        } else {
          future = next(iterator!, Trigger.DATA)
          yield value
        }
      }
    }
  }
}
