import {ROUTER_INIT} from "../config/constant";
import Home from "../features/user/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ProductDetail from "../features/user/ProductDetail";

export const publicRoutes = [
    {
        path: ROUTER_INIT.HOME,
        element: <Home />
    },
    {
        path: ROUTER_INIT.LOGIN,
        element: <Login />
    },
    {
        path: ROUTER_INIT.REGISTER,
        element: <Register />
    },
    {
        path: `${ROUTER_INIT.PRODUCT}/:productId`,
        element: <ProductDetail />
    },
]