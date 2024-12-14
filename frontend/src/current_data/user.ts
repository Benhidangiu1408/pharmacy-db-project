import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface user{
    id:number;
    jobType:string;    
    name:"";
}
export interface userStore{
    info:user;
    login:(user:user)=> void
    logout:()=> void
    getInfo:()=>user
    setJobType:(newJobType: string)=>void
}

const useUserStore = create<userStore>()(persist(
  (set, get) => ({
    // Initial state
    info: {
        id:0,
        jobType:"" ,
        name:""
    },
  
    // Login: Set the user info
    login: (user) =>
      set(() => ({
        info: user,
      })),
  
    // Logout: Clear the user info
    logout: () =>
      set(() => ({
        info: {
            id:0,
            jobType:"" ,
            name:""
        }
      })),
    // GetInfo: Return the current user info
    getInfo: () => get().info,

    setJobType: (newJobType: string) =>
        set((state) => ({
          info: {
            id: state.info.id,
            name:state.info.name,
             // Keep the id unchanged
            jobType: newJobType, // Replace the old jobType with the new one
          },
        })),

  }),
  { name: "user-store"  }

));

export default useUserStore