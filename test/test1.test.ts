import { suite, test } from '@testdeck/mocha'
import { expect } from 'chai'

@suite
export class TestA {
  @test isSomething() {
    expect(2 + 3).to.equal(5)
  }
}
