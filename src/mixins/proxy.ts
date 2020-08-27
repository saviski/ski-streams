import { AsyncStream } from '../async-stream.js'
import { proxy } from '../op/proxy.js'
import { from } from './from.js'

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
