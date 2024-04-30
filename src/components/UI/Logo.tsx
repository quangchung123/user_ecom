import React, {ImgHTMLAttributes} from 'react';
import {useRouter} from "next/router";
import {IReactWithChildren} from "@/types";

const Logo:IReactWithChildren<ImgHTMLAttributes<any>> = (props,context) => {
    const router = useRouter();
    const goToHome  = ()=>{
        router.push("/");
    }
    return (
        <img onClick={goToHome} alt="logo" className={"header__layout--logo"} {...props}/>
    );
};

export default Logo;
