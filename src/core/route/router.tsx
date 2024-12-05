import { createBrowserRouter, Navigate } from "react-router-dom";
import { NotFoundPage } from "../../common/pages";
import { AdminLayout } from "../../common/components";
import AuthChecker from "../../common/components/AuthChecker";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../../features/auth/login/presentation/ui/LoginPage";
import PrivacyPolicyPage from "../../features/privacy-policy/presentation/ui/PrivacyPolicyPage";
import DashboardPage from "../../features/dashboard/presentation/ui/DashboardPage";
import { UserDetailPage, UsersListPage, UsersPage } from "@/features/user/presentation";
import { routeName } from "./route-name";
import UserRolePage from "@/features/role/presentation/ui/RolePage";
import CreateUserPage from "@/features/user/presentation/ui/CreateUserPage";
import CompanyPage from "@/features/company/presentation/ui/CompanyPage";
import CompanyListPage from "@/features/company/presentation/ui/CompanyListPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          element: <AuthChecker />,
          children: [
            {
              element: <ProtectedRoute />, // Protect the dashboard route
              children: [
                {
                  path: routeName.dashboard,
                  element: <DashboardPage />,
                  errorElement: <NotFoundPage />,
                  children: [
                    //Redirect from /dashboard to /dashboard/users
                    {
                      // default component  - This will match the exact /dashboard path
                      index: true,
                      // Redirects to /dashboard/users
                      element: <Navigate to={routeName.users} replace={true} />,
                    },
                    {
                      path: routeName.users,
                      element: <UsersPage />,
                      errorElement: <NotFoundPage />,
                      children: [
                        {
                          index: true, // default component
                          element: <UsersListPage />,
                          errorElement: <NotFoundPage />,
                        },
                        {
                          path: ":id",
                          element: <UserDetailPage />,
                          errorElement: <NotFoundPage />,
                          children: [
                            {
                              path: routeName.roles,
                              element: <UserRolePage />,
                              errorElement: <NotFoundPage />,
                            },
                          ]
                        },
                        {
                          path: routeName.createUser,
                          element: <CreateUserPage />,
                          errorElement: <NotFoundPage />,
                        }
                      ],
                    },
                    {
                      path: routeName.roles,
                      element: <UserRolePage />,
                      errorElement: <NotFoundPage />,
                    },
                    {
                      path: routeName.company,
                      element: <CompanyPage />,
                      errorElement: <NotFoundPage />,
                      children: [
                        {
                          index: true,
                          element: <CompanyListPage />,
                          errorElement: <NotFoundPage />,
                        },
                      ]
                    },
                    
                  ],
                },
              ],
            },
          ],
        },
        {
          // Prevent logged-in users from visiting login page
          element: <PublicRoute />, 
          children: [
            {
              path: routeName.login,
              element: <LoginPage />,
              errorElement: <NotFoundPage />,
              children: [],
            },
          ],
        },
        // Publicly accessible route for Privacy Policy
        {
          path: routeName.privacyPolicy,
          element: <PrivacyPolicyPage />,
          errorElement: <NotFoundPage />,
        },        
        {
          path: routeName.others,
          element: <NotFoundPage />,
        },
      ],
    },
  ]);