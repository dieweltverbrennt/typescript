interface IA {
  a: number
  b: string
}

interface IB {
  a: number
  c: boolean
}

let a: IA = { a: 5, b: '' }
let b: IB = { a: 10, c: true }

interface IDifference {
  b: string
}

function difference<T extends object, Y extends object>(
  a: T,
  b: Y,
): Pick<T, Exclude<keyof T, keyof Y>> {
  const result = { ...a }
  const keysB = Object.keys(b) as (keyof T & string)[]

  for (const key of keysB) {
    delete result[key]
  }

  return result
}

let v0: IDifference = difference(a, b)
