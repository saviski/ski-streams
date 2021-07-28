const FOREVER = new Promise<any>(() => {})

export async function* trigger<T, U, This = any>(
  source: AsyncIterable<T>,
  emitter: (this: This, v: T) => AsyncIterable<U>,
  context?: This
): AsyncIterable<U> {
  let signaller = source[Symbol.asyncIterator]()
  let target: AsyncIterator<U> | undefined

  let signal!: Promise<IteratorResult<T, T>>
  let empty: boolean | undefined
  let finished: boolean | undefined

  async function read() {
    while (!empty) {
      signal = signaller.next()
      let result = await signal
      empty = result.done
      if (empty) {
        signal = FOREVER
        return
      }
      target?.return?.()
      target = emitter.call(context!, result.value)[Symbol.asyncIterator]()
    }
  }

  read()
  await signal

  while (!empty || !finished) {
    const skip = signal.then(() => [])
    const emit = target!.next().then(({ value, done }) => ((finished = done) ? (empty ? [] : FOREVER) : [value]))
    emit.then(v => console.log('trigger emit', v[0]))
    ;(emit =>
      skip.then(async () => {
        console.log('trigger skipped', emit)
        console.log('skipped', (await emit)[0], { finished, empty })
      }))(emit)
    let values = await Promise.race([skip, emit])
    console.log('yielding', values[0], { finished, empty })
    yield* values
  }
}
