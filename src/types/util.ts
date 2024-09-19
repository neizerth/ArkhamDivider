export type PropsWithClassName = {
    className?: string;
};

export type Mapping<T = string> = {
    [index: string]: T
}

export type Single<T extends unknown[]> = T[number] 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FirstParam<F extends (arg: any) => unknown> = Parameters<F>[0]; 

export type Defined<T> = Exclude<T, undefined>;