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

interface Narrator {
  name: string
  type: 'tonton' | 'petit-fils'
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
  const { subscribe, update, set } = writable<User>({ name: "Bouffon"} as User)

  return {
    subscribe,
    update,
    set
  }
}

const createNarratorStore = () => {
  const { subscribe, update, set } = writable<Narrator>({} as Narrator)

  return {
    subscribe,
    update,
    set
  }
}

export const screen = createScreenStore()
export const user = createUserStore()
export const narrator = createNarratorStore()
