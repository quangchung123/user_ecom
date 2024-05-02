import {ROUTER_INIT} from "../config/constant";
import Home from "../features/user/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

export const publicRoutes = [
    {
        path: ROUTER_INIT.USER,
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

]