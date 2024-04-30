import React from 'react';
import Header from "@/container/Header";
import Footer from "@/container/Footer";
import {IReactWithChildren} from "@/types";
import Main from "@/container/Main";

const Layout: IReactWithChildren<{categories:Array<any>,contacts:Array<any>}> = ({children,categories,contacts}) => {
    return (
        <div className={"title w-screen min-h-screen "}>
            <Header contacts={contacts} categories={categories}/>
            <Main>
                {children}
            </Main>
            <Footer categories={categories} contacts={contacts} />
        </div>
    );
};

export default Layout;
