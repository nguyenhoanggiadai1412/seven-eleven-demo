import { Navigate, useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { ReactElement } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import ProductCreatePage from "../pages/admin/products/ProductCreatePage";
import ProductDetailPage from "../pages/admin/products/ProductDetailPage";
import ProductEditPage from "../pages/admin/products/ProductEditPage";
import ProductListPage from "../pages/admin/products/ProductListPage";
import OrderDetailPage from "../pages/admin/orders/OrderDetailPage";
import OrderListPage from "../pages/admin/orders/OrderListPage";
import { publicRoutes } from "./public.routes";
import AuthGuard from "./guards/AuthGuard";

type AppRoute = {
  path: string;
  element: ReactElement;
  isProtected?: boolean;
  children?: AppRoute[];
};

const adminRoutes: AppRoute[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="/admin/products" replace /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/create", element: <ProductCreatePage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "products/:id/edit", element: <ProductEditPage /> },
      { path: "orders", element: <OrderListPage /> },
      { path: "orders/:id", element: <OrderDetailPage /> },
    ],
  },
];

const mapRoutes = (routes: AppRoute[]): RouteObject[] =>
  routes.map((route) => ({
    path: route.path,
    element: route.isProtected ? (
      <AuthGuard>{route.element}</AuthGuard>
    ) : (
      route.element
    ),
    children: route.children ? mapRoutes(route.children) : undefined,
  }));

export default function AppRoutes() {
  return useRoutes([...mapRoutes(publicRoutes), ...mapRoutes(adminRoutes)]);
}
