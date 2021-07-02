import { AsyncEmitter } from '@ski/streams/streams.js'

export function domEvents<K extends keyof GlobalEventHandlersEventMap>(
  element: EventTarget,
  type: K
): AsyncGenerator<GlobalEventHandlersEventMap[K], void, unknown>

export function domEvents<E extends Event = Event>(element: EventTarget, type: string): AsyncGenerator<E, void, unknown>

export async function* domEvents(element: EventTarget, type: string) {
  const emitter = new AsyncEmitter<Event>()

  const listener = event => emitter.yield(event)
  element.addEventListener(type, listener)
  yield* emitter
  element.removeEventListener(type, listener)
}
