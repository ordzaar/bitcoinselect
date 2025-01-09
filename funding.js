const utils = require('./utils')

// given inputs, outputs and feerate, return sats needed to fund the transaction
module.exports = function funding (inputs, outputs, feeRate) {
  if (!isFinite(utils.uintOrNaN(feeRate))) return {}

  let inAccum = 0
  const outAccum = utils.sumOrNaN(outputs)

  for (var i = 0; i < inputs.length; ++i) {
    const utxo = inputs[i]
    const utxoValue = utils.uintOrNaN(utxo.value)

    inAccum += utxoValue
  }

  // use all inputs and outputs
  const bytesAccum = utils.transactionBytes(inputs, outputs)
  const fee = feeRate * bytesAccum

  return {
    funding: Math.ceil(outAccum + fee - inAccum), // negative if overfunded
    totalOutput: outAccum,
    totalInput: inAccum,
    fee: fee
  }
}
