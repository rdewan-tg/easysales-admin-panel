import { create } from "zustand";
import { AreaState } from "../state/area-state";
import { CreateAreaDto } from "../../data/source/remote/dto/create-area.dto";
import { UpdateAreaDto } from "../../data/source/remote/dto/update-area.dto";
import {
  createArea as createAreaApi,
  createManyArea as createManyAreaApi,
  getAreas as getAreaApi,
  getAreaById as getAreaByIdApi,
  updateArea as updateAreaApi,
  deleteArea as deleteAreaApi,
} from "../../data/source/remote/api/area-api";
import { createSelectors } from "@/core/data";

const useAreaStore = create<AreaState>((set) => ({
  areas: [],
  area: null,
  loading: false,
  isCreated: null,
  isUpdated: null,
  isDeleted: null,
  error: null,
  getAreas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAreaApi();
      set({ areas: response.data, loading: false });
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
  getAreaById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await getAreaByIdApi(id);
      set({ area: response.data, loading: false });
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
  createArea: async (area: CreateAreaDto) => {
    try {
      set({ loading: true, error: null });
      const response = await createAreaApi(area);
      set({ area: response.data, loading: false, isCreated: true });
      setTimeout(() => {
        set({ isCreated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
  createManyArea: async (area: CreateAreaDto[]) => {
    try {
      set({ loading: true, error: null });
      const response = await createManyAreaApi(area);
      set({ area: response.data, loading: false, isCreated: true });
      setTimeout(() => {
        set({ isCreated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
  updateArea: async (area: UpdateAreaDto) => {
    try {
      set({ loading: true, error: null });
      const response = await updateAreaApi(area);
      set({ area: response.data, loading: false, isUpdated: true });
      setTimeout(() => {
        set({ isUpdated: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
  deleteArea: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteAreaApi(id);
      set({ area: response.data, loading: false, isDeleted: true });
      setTimeout(() => {
        set({ isDeleted: false });
      }, 3000);
    } catch (error) {
      set({ error: error as string });
    } finally {
      set({ loading: false });
    }
  },
}));

export default createSelectors(useAreaStore);
