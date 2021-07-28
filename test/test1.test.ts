import { suite, test } from './testdeck.esm.js'
import { expect } from 'chai'

@suite
export class TestClass {
  @test 'is Something'() {
    expect(2 + 3).to.equal(5)
  }
}
