import { AsyncStream } from '../async-stream'
import { proxy } from '../op/proxy'
import { from } from './from'

type AsyncGeneratorProxy<T> = {
  [K in keyof T]: AsyncGeneratorProxy<T[K]>
}

declare module '../async-stream' {
  interface AsyncStream<T> {
    proxy: AsyncGeneratorProxy<T>
  }
}

Object.defineProperties(AsyncStream.prototype, {
  proxy: {
    get(this: AsyncStream<any>) {
      return proxy(this, from)
    },
  },
})
