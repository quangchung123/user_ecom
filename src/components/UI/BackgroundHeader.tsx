import React, {ImgHTMLAttributes} from 'react';
import {IReactWithChildren} from "@/types";

const BackgroundHeader:IReactWithChildren<ImgHTMLAttributes<any>> = (props, context) => {
    return (
        <img className={"object-contain h-auto w-full"} {...props} />
    );
};

export default BackgroundHeader;
