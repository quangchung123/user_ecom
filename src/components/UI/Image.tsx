import React from 'react';
import {IReactWithChildren} from "@/types";

const Image: IReactWithChildren<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (props, context) => {
    // eslint-disable-next-line react/jsx-no-undef
    return <img {...props}/>;
};

export default Image;
