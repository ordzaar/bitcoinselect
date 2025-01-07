// utils.d.ts
import {SelectedUTXO, Target, UTXO} from "./index";

declare module "bitcoinselect/utils" {
    export function inputBytes(input: UTXO): number;
    export function outputBytes(output: Target): number;
    export function dustThreshold(output: Target, feeRate: number): number;
    export function transactionBytes(inputs: UTXO[], outputs: Target[]): number;
    export function uintOrNaN(v: any): number;
    export function sumForgiving(range: any[]): number;
    export function sumOrNaN(range: any[]): number;
    export function finalize(inputs: UTXO[], outputs: Target[], feeRate: number, changeAddress?: string): SelectedUTXO;
}