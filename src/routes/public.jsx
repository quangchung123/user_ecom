import {ROUTER_INIT} from "../config/constant";
import Home from "../features/user/Home";

export const publicRoutes = [
    {
        path: ROUTER_INIT.USER,
        element: <Home />
    }
]