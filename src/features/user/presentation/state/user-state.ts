import { User, UserDetail } from "../../data";


export type UserState = {
    users: User[],   
    user?: UserDetail, 
    isLoading: boolean,
    isUserDeleted: boolean | null,
    error: string | null,
    deleteSnackbarOpen: boolean,
    setDeleteUserSnackbarOpen: (value: boolean) => void,
    getUsersByCompany: () => Promise<void>,
    getUserById: (id: number) => Promise<void>,
    deleteUser: (id: number) => Promise<void>,
    setUserDeleted: (value: boolean) => void,
    reset: () => void
}