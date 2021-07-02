import { DONE } from '../async-stream.js'
import { hasAsyncGenerator } from './has.js'

export const FINISHED: AsyncGenerator<any, void, any> = <any>{
  next: () => new Promise(() => {}),
  return: () => DONE,
  throw: () => DONE,
  [Symbol.asyncIterator]() {
    return this
  },
}

export function trigger<T, R>(
  source: AsyncGenerator<T>,
  generator: AsyncGenerator<R>
): AsyncGenerator<R, any, any>

export function trigger<T, R, V = any>(
  source: AsyncGenerator<T>,
  factory: (this: V, v: T) => AsyncGenerator<R>,
  context?: V
): AsyncGenerator<R, any, any>

export async function* trigger<T, U, R>(
  source: AsyncGenerator<T>,
  emitter,
  context?
): AsyncGenerator<R, any, any> {
  let target = FINISHED
  const build: (v: U) => AsyncGenerator<R> = hasAsyncGenerator(emitter)
    ? () => emitter
    : context
    ? emitter.bind(context)
    : emitter
  const empty: (..._) => R[] = () => []

  while (source !== FINISHED || target !== FINISHED) {
    // prettier-ignore
    yield* await Promise.race([
      source.next().then(({ value, done }) => done ? empty((source = FINISHED)) : empty(target.return(), (target = build(value)))),
      target.next().then(({ value, done }) => done ? empty((target = FINISHED)) : [value]),
    ])
  }
}
