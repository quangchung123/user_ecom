import Login from "../features/auth/Login";
import {ROUTER_INIT} from "../config/constant";

export const publicRoutes = [
    {
        path: ROUTER_INIT.LOGIN,
        element: <Login />
    }
]