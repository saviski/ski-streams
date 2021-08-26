import { suite, test } from './lib/testdeck.esm.js'
import { stream } from './stream.test.js'

@suite
export class ForEachTest {
  //
  @test async 'forEach calls the callback for each value'() {
    let values: number[] = []
    await stream([1, 2, 3]).forEach(value => values.push(value))
    values.should.eql([1, 2, 3])
  }

  @test async 'forEach never calls the callback from an empty stream'() {
    let values: any[] = []
    await stream([]).forEach(value => values.push(value))
    values.should.eql([])
  }
}
