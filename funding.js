const utils = require('./utils')

// given utxos, outputs and feerate, return sats needed to fund the transaction
module.exports = function funding (utxos, outputs, feeRate) {
  if (!isFinite(utils.uintOrNaN(feeRate))) return {}

  let inAccum = 0
  const outAccum = utils.sumOrNaN(outputs)

  for (var i = 0; i < utxos.length; ++i) {
    const utxo = utxos[i]
    const utxoValue = utils.uintOrNaN(utxo.value)

    inAccum += utxoValue
  }

  // use all utxos as inputs
  const bytesAccum = utils.transactionBytes(utxos, outputs)
  const fee = feeRate * bytesAccum

  return {
    funding: Math.ceil(outAccum + fee - inAccum), // negative if overfunded
    totalOutput: outAccum,
    totalInput: inAccum,
    fee: fee
  }
}
