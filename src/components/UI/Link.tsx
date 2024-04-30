import React, {HTMLAttributes} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {IDivProps, ILiProps, IReactWithChildren} from "@/types";

type ILinkProps = {
    url: string,
    item?: any
} & ILiProps

const Link: IReactWithChildren<ILinkProps> = ({children, url="", item = {}, ...props}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const click = () => {
        router.push({
            pathname: url,
            query: item,
        }, url)
    }
    return (
        <li role={"button"} onClick={click} {...props}>
            {children}
        </li>
    );
};

export default Link;
