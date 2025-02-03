import { LoginForm } from "../../../../../common/types";
import { LoginResponseData } from "../../data";


export type AuthState = {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    loginData: LoginResponseData | null;
    login: (data: LoginForm) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthState: () => Promise<void>;
};

