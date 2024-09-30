export const logValue = <T>(x: T, ...messages: string[]) => {
    console.log(...messages, x)
    return x
}

export const prop = <K extends keyof U, U>(prop: K) => (obj: U): U[K] => obj[prop]