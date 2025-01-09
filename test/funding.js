const fixtures = require('./fixtures/funding.json')
const utils = require('./_utils')
const tape = require('tape')
const funding = require('../funding')

fixtures.forEach(function (f) {
  tape(f.description, function (t) {
    var inputs = utils.expand(f.inputs, true)
    var outputs = utils.expand(f.outputs)
    var actual = funding(inputs, outputs, f.feeRate)

    t.same(actual, f.expected)
    if (actual.inputs) {
      var feedback = funding(actual.inputs, actual.outputs, f.feeRate)
      t.same(feedback, f.expected)
    }

    t.end()
  })
})
