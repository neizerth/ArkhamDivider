export type PropsWithClassName = {
    className?: string;
};

export type Mapping<T = string> = {
    [index: string]: T
}

export type Single<T extends unknown[]> = T[number] 