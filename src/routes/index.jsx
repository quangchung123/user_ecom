import {protectedRoutes} from "./protected";
import {publicRoutes} from "./public";
import {useRoutes} from "react-router-dom";

const MODULES = [...protectedRoutes, ...publicRoutes];

export const AppRoutes =() => {
    const element =useRoutes([...MODULES]);
    return <>{element}</>
}