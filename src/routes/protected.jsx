import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleLoadDataFromStorage } from "../utils/help";
import {LOCAL_STORAGE_KEY, ROUTER_ADMIN, ROUTER_INIT} from "../config/constant";
import Dashboard from "../features/admin/Dashboard";
import Product from "../features/admin/Product";
import MainLayout from "../container/MainLayout";
import Categories from "../features/admin/Categories";
import User from "../features/admin/User";
import ProductDetail from "../features/admin/ProductDetail";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.userAccount.user);
  const storedUser = user? handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE).user : null;
  const parsedPersistedData = JSON.parse(storedUser);
  const isAuthenticated = user || parsedPersistedData;
  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout> ): (<Navigate to={ROUTER_INIT.LOGIN} />);
};

export const protectedRoutes = [
  {
    path: ROUTER_INIT.ADMIN,
    element: <ProtectedRoute />,
    children: [
      { path: ROUTER_ADMIN.DASHBOARD, element: <Dashboard /> },
      { path: ROUTER_ADMIN.PRODUCT, element: <Product /> },
      { path: `${ROUTER_ADMIN.PRODUCT}/:productId`, element: <ProductDetail /> },
      { path: ROUTER_ADMIN.CATEGORY, element: <Categories /> },
      { path: ROUTER_ADMIN.USER, element: <User /> }
    ]
  }
];
