import { Edit } from 'lucide-react'
import { create } from 'zustand'

export const useEmail = create((set) => ({
  email: "",
  name:"",
  phone:"",
  JobDesc:"",
  Uname:"",
  setEmail: (email, name, phone, JobDesc, Uname) => set(() => ({ email, name, phone, JobDesc, Uname })),
}))

export const useEdit = create((set)=>({
  zustEdit:false,
  setEdit:(Boolean)=> set(()=>({Edit:Boolean}))
}))