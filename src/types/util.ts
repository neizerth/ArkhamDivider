export type PropsWithClassName = {
    className?: string;
};

export type Mapping<T = string | undefined> = Record<string, T>

export type Single<T extends unknown[]> = T[number] 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FirstParam<F extends (arg: any) => unknown> = Parameters<F>[0]; 

export type Defined<T> = Exclude<T, undefined>;

export type PrefixedUnion<Prefix extends string, Values extends string> = `${Prefix}${Values}`

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];