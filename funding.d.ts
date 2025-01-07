// funding.d.ts
import { Target, UTXO } from "./index";

export default function funding(utxos: UTXO[], outputs: Target[], feeRate: number): {
    funding: number,
    totalOutput: number,
    totalInput: number,
    fee: number
};