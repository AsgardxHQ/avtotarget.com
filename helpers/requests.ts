export interface FetchOptions {
  method: string,
  credentials?: RequestCredentials,
  redirect?: RequestRedirect,
  referrerPolicy?: ReferrerPolicy,
  headers?: Headers,
  body?: string
}
export interface Headers {
  [key:string]: string
}

export const request = async (url = '', type = 'GET',  data = {}) => {
    const options:FetchOptions = {
      method: type,
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer'
    }
    if(Object.keys(data).length > 0) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    return await response.json();
  }