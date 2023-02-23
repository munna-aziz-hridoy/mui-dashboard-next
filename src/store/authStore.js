import create from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = set => ({
  user: null,
  addUser: userData => set({ user: userData }),
  removeUser: () => set({ user: null })
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth'
  })
)

export default useAuthStore
