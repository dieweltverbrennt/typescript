enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user'
}

interface Hair {
  color: string
  type: string
}

interface Coordinates {
  lat: number
  lng: number
}

interface Adress {
  adress: string
  city: string
  state: string
  stateCode: string
  postalCode: number
  coordinates: Coordinates
  country: string
}

interface Bank {
  cardExpire: string
  cardNumber: number
  cardType: string
  currency: string
  iban: string
}

interface Company {
  department: string
  name: string
  title: string
  address: Adress
}

interface Crypto {
  coin: string
  wallet: string
  network: string
  role: Role
}

interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Adress
  macAddress: string
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: Role
}

interface Users {
  users: User[]
}

async function getUsers() {
  return fetch('https://dummyjson.com/users')
    .then(response => {
      if(response.status !== 200) {
        throw new Error('Error')
      }
      return response.json()
    })
    .then((data: Users) => {
      console.log(data.users);
    })
    .catch(error => {
      const err = error as Error
      throw new Error(err.message)
    })
  
}

getUsers()