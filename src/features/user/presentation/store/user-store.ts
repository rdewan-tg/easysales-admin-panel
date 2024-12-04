import { create } from "zustand";
import { createSelectors } from "../../../../core/data";
import { UserState } from "../state/user-state";
import { deleteUser, getUserById, getUsersByCompany } from "../../data";

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  user: undefined,
  isLoading: false,
  isUserDeleted: null,
  error: null,
  deleteSnackbarOpen: false,
  setDeleteUserSnackbarOpen: (value: boolean) => {
    set({ deleteSnackbarOpen: value });
  },
  getUsersByCompany: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getUsersByCompany();
      set({ users: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ users: [], isLoading: false, error: errorMessage });
    }
  },
  getUserById: async (id: number) => {
    try {
      set({ isLoading: true, error: null, isUserDeleted: null });
      const response = await getUserById(id);
      set({ user: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  deleteUser: async function (id: number) {
    try {
      set({ isLoading: true, error: null, isUserDeleted: null });
      await deleteUser(id);
      set({ isUserDeleted: true, isLoading: false, error: null });
      get().reset();
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  setUserDeleted: (value: boolean) => {
    set({ isUserDeleted: value });
  },
  reset: () => {
    set({
      users: [],
    });
  },
}));

export default createSelectors(useUserStore);
