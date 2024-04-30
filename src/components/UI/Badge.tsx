import React, {HTMLAttributes} from 'react';
import {IReactWithChildren} from "@/types";

const Badge: IReactWithChildren<HTMLAttributes<HTMLSpanElement> & { type?: "reject" | 'pending' | 'success' | "" }> = ({children, type = "", className, ...props}) => {
    return (
        <span
            {...props}
            className={`flex justify-center h-fit items-center gap-1 p-1 rounded-full mx-auto px-2 py-0.5 text-black text-sm ${className} ${type.toLowerCase() === 'success' ? 'bg-secondary' : type.toLowerCase() === 'reject' ? 'bg-accent' : 'bg-yellow-400'}`}
        >
            {children}
        </span>
    );
};

export default Badge;
