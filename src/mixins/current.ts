import { AsyncStream } from '../async-stream'

declare module '../async-stream' {
  interface AsyncStream<T> {
    current: Promise<IteratorResult<T>>
  }
}

Object.defineProperties(AsyncStream, {
  current: {
    get() {
      const set = () => (this.current = this.next().then(next))
      const next = value => set() && value
      Object.defineProperty(this, 'current', { value: null, writable: true })
      return set()
    },
  },
})
