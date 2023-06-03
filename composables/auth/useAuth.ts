import { useAuthUser } from './useAuthUser'

export const useAuth = () => {
  const authUser = useAuthUser()

  const setUser = (user: any) => {
    authUser.value = user
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    const data:any = await $fetch('/api/v1/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
        rememberMe,
      },
    })

    setUser(data.user)

    return authUser
  }

  const reg = async (
    email: string,
    password: string,
    confirm_password: string
  ) => {
    const data:any = await $fetch('/api/v1/auth/reg', {
      method: 'POST',
      body: {
        email,
        password,
        confirm_password,
      },
    })

    setUser(data.user)

    return authUser
  }

  const logout = async () => {
    const data:any = await $fetch('/api/v1/auth/logout', {
      method: 'POST',
    })

    setUser(data.user)
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data:any = await $fetch('/api/v1/auth/me', {
          headers: useRequestHeaders(['cookie']) as HeadersInit,
        })

        setUser(data.user)
      }
      catch (error) {
        setCookie(null)
      }
    }

    return authUser
  }

  return {
    login,
    logout,
    reg,
    me,
  }
}
