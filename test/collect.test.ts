import { suite, test } from './lib/testdeck.esm.js'
import 'chai/register-should.js'
import { expect } from 'chai'
import { stream } from './stream.test.js'

@suite
export class CollectTest {
  //
  @test async 'collect returns an empty list from an empty stream'() {
    expect(await stream([]).collect()).to.eql([])
  }

  @test async 'collect returns a list with all the values'() {
    expect(await stream([1, 2, 3]).collect()).to.eql([1, 2, 3])
  }
}
