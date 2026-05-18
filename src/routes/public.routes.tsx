import { lazy } from "react";
import MainLayout from "../components/layouts/MainLayout";
import UserOrderPage from "../pages/user/UserOrderPage";
const WelcomePage = lazy(() => import("../pages/public/WelcomePage"));

export const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "/user",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <UserOrderPage />,
      },
    ],
  },
];