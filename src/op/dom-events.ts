import { AsyncEmitter } from '../async-emitter.js'

export function domEvent<K extends keyof GlobalEventHandlersEventMap>(
  element: EventTarget,
  type: K
): AsyncIterable<GlobalEventHandlersEventMap[K]>

export function domEvent<E extends Event = Event>(element: EventTarget, type: string): AsyncIterable<E>

export async function* domEvent(element: EventTarget, type: string) {
  const emitter = new AsyncEmitter<Event>()

  const listener = event => emitter.yield(event)
  element.addEventListener(type, listener)
  yield* emitter
  element.removeEventListener(type, listener)
}
