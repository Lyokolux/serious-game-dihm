import { writable } from 'svelte/store'

interface Screen {
  width: number
  height: number
  device?: 'mobile' | 'computer'
}

interface User {
  name: string
  age: number
  diseases: string[]
}

const createScreenStore = () => {
  const { subscribe, update, set } = writable<Screen>({} as Screen)

  return {
    subscribe,
    update,
    set
  }
}

const createUserStore = () => {
  const { subscribe, update, set } = writable<User>({} as User)

  return {
    subscribe,
    update,
    set
  }
}

export const screen = createScreenStore()
export const user = createUserStore()
