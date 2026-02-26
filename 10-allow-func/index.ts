function allowFunc<T>(validator: (value: T) => boolean) {
  return function (target: any, propertyKey: string) {
    let value: T

    const getter = function () {
      return value
    }

    const setter = function (newValue: T) {
      if (validator(newValue)) {
        value = newValue
      }
      // Если валидация не пройдена, значение не меняется
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}

class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30
}

const person = new User()
console.log(person.age) // 30

person.age = 0
console.log(person.age) // 30

person.age = 20
console.log(person.age) // 20
