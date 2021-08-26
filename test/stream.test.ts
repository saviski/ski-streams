import { suite, test } from './lib/testdeck.esm.js'
import 'chai/register-should.js'
import { stream, delay } from '../streams.js'

@suite
export class StreamTest {
  //

  @test async 'stream emits each array element'() {
    let teststream = stream(['a', 'b', 'c'])
    let list: any[] = []

    for await (let value of teststream) list.push(value)

    list.should.eql(['a', 'b', 'c'])
  }

  @test async 'stream can emit promises mixed with values'() {
    let teststream = stream(['a', Promise.resolve('b'), 'c'])
    let list: any[] = []

    for await (let value of teststream) list.push(value)

    list.should.eql(['a', 'b', 'c'])
  }

  @test async 'stream can consume an async generator'() {
    async function* generator() {
      yield 1
      yield Promise.resolve(2)
      yield 3
    }
    let teststream = stream(generator())
    let list: any[] = []

    for await (let value of teststream) list.push(value)

    list.should.eql([1, 2, 3])
  }

  @test async 'stream can consume another stream'() {
    let teststream = stream(stream([1, 2, 3]))

    let list: any[] = []
    for await (let value of teststream) list.push(value)
    list.should.eql([1, 2, 3])
  }

  @test async 'stream can emit the same values to multiple consumers'() {
    let teststream = stream([1, 2, delay(3, 50)])

    let list1: number[] = []
    let list2: number[] = []

    await Promise.all([
      (async () => {
        for await (let value of teststream) list1.push(value)
      })(),
      (async () => {
        for await (let value of teststream) list2.push(2 * value)
      })(),
    ])

    list1.should.eql([1, 2, 3])
    list2.should.eql([2, 4, 6])
  }

  @test async 'both consumers receive values concurrently'() {
    let teststream = stream([1, 2, delay(3, 50)])

    let list: number[] = []

    await Promise.all([
      (async () => {
        for await (let value of teststream) list.push(value)
      })(),
      (async () => {
        for await (let value of teststream) list.push(value)
      })(),
    ])

    list.should.eql([1, 1, 2, 2, 3, 3])
  }
}

// re-export stream so other tests import stream from this test and
// this test is forced to run before assuring dependencies are tested before using them

export { stream }
