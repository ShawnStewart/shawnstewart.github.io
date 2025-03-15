export type KeyIsRequired<T, K extends keyof T> = undefined extends T[K] ? false : true;

export type RequiredKeys<T> = {
  [K in keyof T]-?: KeyIsRequired<T, K> extends true ? K : never;
}[keyof T];

export type HasRequiredKey<T> = RequiredKeys<T> extends never ? false : true;

export type OneOrMore<T> = [T, ...T[]];
