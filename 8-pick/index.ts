const user = {
  name: 'Vasiliy',
  age: 8,
  skills: ['typescript', 'javascript'],
}

function pickObjectKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const newObj = {} as Pick<T, K>

  keys.forEach((key) => {
    newObj[key] = obj[key]
  })

  return newObj
}

const res = pickObjectKeys(user, ['age', 'skills'])
/*
{
  age: 8,
  skills: ['typescript', 'javascript']
}
*/
