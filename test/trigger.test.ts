import { suite, test } from './lib/testdeck.esm.js'
import 'chai/register-should.js'
import { expect } from 'chai'

import { delay } from '../streams.js'
import { stream } from './stream.test.js'

@suite
export class TriggerTest {
  //
  @test
  async 'sync trigger emits all values from last signal'() {
    let list = await stream([1, 2, 3])
      .trigger(n => stream([`${n}a`, `${n}b`, `${n}c`]))
      .collect()
    list.should.eql(['3a', '3b', '3c'])
  }

  @test async 'async trigger of sync stream emmits all the combined values'() {
    expect(
      await stream([1, delay(2), delay(3)])
        .trigger(n => stream([`${n}a`, `${n}b`, `${n}c`]))
        .collect()
    ).to.be.eql(['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c'])
  }

  @test async 'async trigger ends the current emitted stream when a new signal arrives and starts a new one'() {
    /*  
        time  signal-> 0  1   2   3   4   5   6   7   8   9   10
        emits          1                  2           3
        1   |          a              /   a       /   a
        2  \/                     /           /
        3                     /          end
        4              b  /                           b
        5             end                               
        6               
        7
        8
        9
        10                                            c
     */
    expect(
      await stream([1, delay(2, 50), delay(3, 80)])
        .trigger(n => stream([`${n}a`, delay(`${n}b`, 40), delay(`${n}c`, 100)]))
        .collect()
    ).to.be.eql(['1a', '1b', '2a', '3a', '3b', '3c'])
  }

  @test async 'trigger chain restart only the subsequent streams'() {
    expect(
      await stream(['a'])
        .trigger(s1 => stream([delay(`${s1}a`), delay(`${s1}b`)]))
        .trigger(s2 => stream([`${s2}a`]))
        .trigger(s2 => stream([`${s2}a`]))
        .collect()
    ).to.be.eql(['aaaa', 'abaa'])
  }
}
