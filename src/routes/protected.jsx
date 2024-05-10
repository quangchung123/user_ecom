import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleLoadDataFromStorage } from "../utils/help";
import {LOCAL_STORAGE_KEY, ROUTER_ADMIN, ROUTER_INIT} from "../config/constant";
import MainLayout from "../container/user/MainLayout";
import Cart from "../features/user/product/CartProduct";
import AccountCustomer from "../features/user/account/AccountCustomer";
import CheckoutProduct from "../features/user/product/CheckoutProduct";

const ProtectedRoute = ({element}) => {
  const user = useSelector((state) => state.userAccount.user);
  const storedUser = user? handleLoadDataFromStorage(LOCAL_STORAGE_KEY.PERSIST_STORE).userAccount : null;
  const parsedPersistedData = JSON.parse(storedUser);
  const isAuthenticated = user || parsedPersistedData;
  return isAuthenticated ? (
    <MainLayout>
      {element}
    </MainLayout> ): (<Navigate to={ROUTER_INIT.LOGIN} />);
};

export const protectedRoutes = [
  {
    path: ROUTER_INIT.CART,
    element: <ProtectedRoute element={<Cart />} />
  },
  {
    path: ROUTER_INIT.ACCOUNT,
    element: <ProtectedRoute  element={<AccountCustomer />} />,
  },
  {
    path: `${ROUTER_INIT.CHECKOUT}/:productSelectedId`,
    element: <ProtectedRoute  element={<CheckoutProduct />} />,
  }
];
