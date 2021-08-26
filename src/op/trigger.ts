const FOREVER = new Promise<any>(() => {})

enum Trigger {
  SIGNAL,
  DATA,
}

export async function* trigger<T, U, This = any>(
  source: AsyncIterable<T>,
  emitter: (this: This, v: T) => AsyncIterable<U>,
  context?: This
): AsyncIterable<U> {
  const signals = source[Symbol.asyncIterator]()
  let iterable: AsyncIterable<U>
  let iterator: AsyncIterator<U>

  function create(value) {
    return emitter.call(context!, value)
  }

  function next(asynciterator: AsyncIterator<any>, type: Trigger) {
    return asynciterator.next().then(s => ({ ...s, type }))
  }

  let signal = next(signals, Trigger.SIGNAL)
  let future: Promise<{ type: Trigger; done?: boolean; value: any }> = FOREVER

  while (true) {
    let { value, done, type } = await Promise.race([signal, future])
    if (type == Trigger.SIGNAL) {
      if (done) {
        yield* iterable!
        return
      }
      iterable = create(value)
      iterator = iterable[Symbol.asyncIterator]()
      future = next(iterator, Trigger.DATA)
      signal = next(signals, Trigger.SIGNAL)
    } else if (type == Trigger.DATA) {
      if (done) {
        future = FOREVER
      } else {
        future = next(iterator!, Trigger.DATA)
        yield value
      }
    }
  }
}
