import { create } from 'zustand'

export const useEmail = create((set) => ({
  email: "",
  name:"",
  phone:"",
  JobDesc:"",
  setEmail: (email, name, phone, JobDesc) => set(() => ({ email, name, phone, JobDesc })),
}))