export type Single<T extends Array<unknown>> = T[number];

export type Defined<T> = Exclude<T, undefined>;

// biome-ignore lint/suspicious/noExplicitAny: generic function usage
export type GenericFunction = (...args: any) => any;

export type ReturnAwaited<T extends GenericFunction> = Awaited<ReturnType<T>>;

export type WithId<T = string> = { id: T };
