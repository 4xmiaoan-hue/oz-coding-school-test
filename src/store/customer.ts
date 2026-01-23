import { create } from 'zustand'

type CustomerState = {
  name: string
  setName: (name: string) => void
}

export const useCustomerStore = create<CustomerState>((set) => ({
  name: '',
  setName: (name: string) => set({ name }),
}))
