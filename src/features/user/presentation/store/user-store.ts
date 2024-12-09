import { create } from "zustand";
import { createSelectors } from "../../../../core/data";
import { UserState } from "../state/user-state";
import { createUser, deleteUser, getCompanies, getUserById, getUsersByCompany } from "../../data";
import { SignupForm } from "@/common/types";

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  user: undefined,
  companies: [],
  isLoading: false,
  isUserDeleted: null,
  isUserCreated: null,
  error: null,
  deleteSnackbarOpen: false,
  createUser: async (data: SignupForm) : Promise<void> => {
    try {
      set({ isLoading: true, isUserCreated: null, error: null });
      await createUser(data);
      set({ isLoading: false, isUserCreated: true, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
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
  getCompanies: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCompanies();
      set({ companies: response.data, isLoading: false, error: null });
      
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  reset: () => {
    set({
      users: [],
    });
  },
}));

export default createSelectors(useUserStore);
