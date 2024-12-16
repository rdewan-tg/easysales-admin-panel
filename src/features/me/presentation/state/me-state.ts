import { Me } from "../../data";


export type MeState = {
    isLoading: boolean;
    me: Me | null;
    error: string | null;
    getMe: () => Promise<void>;
}