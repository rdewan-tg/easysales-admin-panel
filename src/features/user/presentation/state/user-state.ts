import { SignupForm } from "@/common/types";
import { Company,  User, UserDetail } from "../../data";


export type UserState = {
    users: User[],   
    user?: UserDetail, 
    companies: Company[],
    isLoading: boolean,
    isUserDeleted: boolean | null,
    error: string | null,
    deleteSnackbarOpen: boolean,
    isUserCreated: boolean | null,
    createUser: (data: SignupForm) => Promise<void>,
    setDeleteUserSnackbarOpen: (value: boolean) => void,
    getUsersByCompany: () => Promise<void>,
    getUserById: (id: number) => Promise<void>,
    deleteUser: (id: number) => Promise<void>,
    setUserDeleted: (value: boolean) => void,
    getCompanies: () => Promise<void>,
    reset: () => void
}