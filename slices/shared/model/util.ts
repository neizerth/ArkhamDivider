export type Single<T extends Array<unknown>> = T[number];

// biome-ignore lint/suspicious/noExplicitAny: generic function usage
export type GenericFunction = (...args: any) => any;

export type ReturnAwaited<T extends GenericFunction> = Awaited<ReturnType<T>>;
