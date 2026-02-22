const obj: Record<string, number> = {
  a: 1,
  b: 2,
}

function swapKeysAndValues<
  K extends string | number | symbol,
  V extends string | number | symbol,
>(obj: Record<K, V>): Record<V, K> {
  let newObj = {} as Record<V, K>

  for (const key in obj) {
    const newKey = obj[key]
    newObj[newKey] = key
  }

  return newObj
}

const res = swapKeysAndValues(obj)
/*
{
  1: 'a',
  2: 'b'
}
*/
