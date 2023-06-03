export interface User {
  id: string
  email: string
  password: string
  roles: string[]
}

export interface FileType {
  [key:string]: any
}

export interface ItemType {
  [key:string]: any
}

export type UserWithoutPassword = Omit<User, 'password'>
