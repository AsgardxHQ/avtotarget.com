export interface User {
  id: string
  email: string
  password: string
  access_level: number
}

export type UserWithoutPassword = Omit<User, 'password'>

export interface QueryPrisma {
  orderBy?: object,
  where?: object,
  take?: number,
  skip?: number,
  include?: object
}

export interface IServerResponse<T = any> {
	success: boolean;
	reason?: string;
	statusCode?: number;
	response?: T;
}

export type FileType = any;
export type ItemType = any;
export type Items = {[key:string]: any};
export type Item = {
  id: number,
  name_uk: string,
  name_ru: string,
  images: string,
  status: number,
  code_vendor: string,
  code_wholesale: string
  price_retail: number,
  count: number
}