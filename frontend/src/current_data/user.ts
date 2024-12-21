import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface user {
  id: number;
  jobType: string;
  name: "";
  address: "";
  phone_no: number;
  working_type: "";
  account: "";
  password: "";
}
export interface userStore {
  info: user;
  login: (user: user) => void;
  logout: () => void;
  getInfo: () => user;
  setJobType: (newJobType: string) => void;
}

const useUserStore = create<userStore>()(
  persist(
    (set, get) => ({
      // Initial state
      info: {
        id: 0,
        jobType: "",
        name: "",
        address: "",
        phone_no: 0,
        working_type: "",
        account: "",
        password: "",
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
            id: 0,
            jobType: "",
            name: "",
            address: "",
            phone_no: 0,
            working_type: "",
            account: "",
            password: "",
          },
        })),
      // GetInfo: Return the current user info
      getInfo: () => get().info,

      setJobType: (newJobType: string) =>
        set((state) => ({
          info: {
            id: state.info.id,
            name: state.info.name,
            // Keep the id unchanged
            jobType: newJobType, // Replace the old jobType with the new one
            address: state.info.address,
            phone_no: state.info.phone_no,
            working_type: state.info.working_type,
            account: state.info.account,
            password: state.info.password,
          },
        })),
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
