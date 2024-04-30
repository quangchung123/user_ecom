import React from 'react';
import {IReactWithChildren} from "@/types";

const Main: IReactWithChildren<{}> = ({children}) => {

    return (
        <main
            className="main">
            {children}
        </main>
    );
};

export default Main;
