// types/sort-by.strict.d.ts

type Primitive = string | number | boolean | null | undefined
type NestedKey<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends Primitive
        ? K
        : `${Extract<K, string>}.${Extract<NestedKey<T[K]>, string>}`
    }[keyof T]
  : never

declare function sortBy<T extends object>(
  ...fields: Array<NestedKey<T> | ((key: string, value: any) => any)>
): (a: T, b: T) => number

declare function sortBy<T extends object>(
  ...fields: Array<NestedKey<T>>
): (a: T, b: T) => number

export = sortBy
