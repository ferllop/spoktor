import { flow as ramdaFlow, prop as ramdaProp } from 'ramda'

export function pipe<S, R1>(seed: S, ...pipeline: [(a: S) => R1]): R1;
export function pipe<S, R1, R2>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2]): R2;
export function pipe<S, R1, R2, R3>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3]): R3;
export function pipe<S, R1, R2, R3, R4>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4]): R4;
export function pipe<S, R1, R2, R3, R4, R5>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5]): R5;
export function pipe<S, R1, R2, R3, R4, R5, R6>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6]): R6;
export function pipe<S, R1, R2, R3, R4, R5, R6, R7>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7]): R7;
export function pipe<S, R1, R2, R3, R4, R5, R6, R7, R8>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8]): R8;
export function pipe<S, R1, R2, R3, R4, R5, R6, R7, R8, R9>(seed: S, ...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8, (a: R8) => R9]): R9;
// catch-all to larger than 9, or if you need to manually set seed type `S` and final return type `R`
export function pipe<S, R>(seed: S, ...pipeline: ReadonlyArray<(a: any) => any>): R {
    return ramdaFlow(seed, pipeline)
}

export function flow<S, R1>(...pipeline: [(a: S) => R1]): (seed: S) => R1;
export function flow<S, R1, R2>(...pipeline: [(a: S) => R1, (a: R1) => R2]): (seed: S) => R2;
export function flow<S, R1, R2, R3>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3]): (seed: S) => R3;
export function flow<S, R1, R2, R3, R4>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4]): (seed: S) => R4;
export function flow<S, R1, R2, R3, R4, R5>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5]): (seed: S) => R5;
export function flow<S, R1, R2, R3, R4, R5, R6>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6]): (seed: S) => R6;
export function flow<S, R1, R2, R3, R4, R5, R6, R7>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7]): (seed: S) => R7;
export function flow<S, R1, R2, R3, R4, R5, R6, R7, R8>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8]): (seed: S) => R8;
export function flow<S, R1, R2, R3, R4, R5, R6, R7, R8, R9>(...pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8, (a: R8) => R9]): (seed: S) => R9;
// catch-all to larger than 9, or if you need to manually set seed type `S` and final return type `R`
export function flow<S, R>(...pipeline: ReadonlyArray<(a: any) => any>): (seed: S) => R {
    return seed => ramdaFlow(seed, pipeline)
}

export const log = <T>(x: T, ...messages: string[]) => {
    console.log(...messages, x)
    return x
}

export const prop = ramdaProp

