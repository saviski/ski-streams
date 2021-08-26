import { suite, test } from './lib/testdeck.esm.js'
import 'chai/register-should.js'

import { AsyncEmitter } from '../streams.js'

@suite
export class AsyncEmitterTest {
  //
  @test async 'is a promise'() {
    let emitter = new AsyncEmitter()
    emitter.should.be.instanceOf(Promise)
  }

  @test 'it resolves after calling return'(done: () => void) {
    let emitter = new AsyncEmitter()
    emitter.then(done)
    emitter.return()
  }

  @test 'it rejects after calling throw'(done: () => void) {
    let emitter = new AsyncEmitter()
    emitter.catch(done)
    emitter.throw('')
  }

  @test 'values emitted before a consumer connects are discarded'(done: () => void) {
    let emitter = new AsyncEmitter()

    emitter.yield(1)
    emitter.yield(2)
    emitter.yield(3)

    let list: any[] = []
    ;(async () => {
      for await (let value of emitter) list.push(value)
      list.should.eql([])
      done()
    })()

    emitter.return()
  }

  @test 'it emits values received after a consumer connects'(done: () => void) {
    let emitter = new AsyncEmitter()

    let list: any[] = []
    ;(async () => {
      for await (let value of emitter) list.push(value)
      list.should.eql([1, 2, 3])
      done()
    })()

    emitter.yield(1)
    emitter.yield(2)
    emitter.yield(3)

    emitter.return()
  }

  @test async 'consumers only receive values after listening'() {
    let emitter = new AsyncEmitter()
    let list1: any[] = []
    let list2: any[] = []

    emitter.yield(1)

    let p1 = (async () => {
      for await (let value of emitter) list1.push(value)
    })()

    emitter.yield(2)

    let p2 = (async () => {
      for await (let value of emitter) list2.push(value)
    })()

    emitter.yield(3)

    emitter.return()
    await Promise.all([p1, p2])

    list1.should.eql([2, 3])
    list2.should.eql([3])
  }
}
