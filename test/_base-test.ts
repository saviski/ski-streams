import { suite, test } from './lib/testdeck.esm.js'
import { stream } from '../streams.js'
import 'chai/register-should.js'
// import { expect } from 'chai'

@suite
export class ForEachTest {
  //
  @test async 'forEach call the callback for each value'() {
    let values: number[] = []
    await stream([1, 2, 3]).forEach(value => values.push(value))
    values.should.eql([1, 2, 3])
  }
}
