import { Outlet, Navigate } from "react-router-dom";
import {LOCAL_STORAGE_KEY, ROUTER_ADMIN, ROUTER_INIT} from "../config/constant";
import MainLayout from "../container/user/MainLayout";
import Cart from "../features/user/product/CartProduct";
import AccountCustomer from "../features/user/account/AccountCustomer";
import CheckoutProduct from "../features/user/product/CheckoutProduct";
import {useId} from "../hooks/useId";

const ProtectedRoute = ({element}) => {
  const isAuthenticated = useId();
  return isAuthenticated ? (
    <MainLayout>
      {element}
    </MainLayout> ): (<Navigate to={ROUTER_INIT.HOME} />);
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
