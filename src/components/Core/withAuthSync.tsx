import React, {useEffect, useState} from 'react';
import {store} from "@/store/makeStore";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import userApi from "@/services/api/userApi";
import {INextPageWithLayout} from "@/pages/_app";
import useGetStore from "@/hooks/useGetStore";
import {selectUser} from "@/services/storage/userSlice";

const withAuthSync = (WrappedComponent: INextPageWithLayout) => {
    store.dispatch(userApi.endpoints.getDetail.initiate(""));
    const wrapper = (props: any) => {
        // eslint-disable-next-line
        const [isWait, setIsWait] = useState(false);
        // eslint-disable-next-line
        const [isAdmin, setIsAdmin] = useState(false);
        // eslint-disable-next-line
        const token = useSelector((state: any) => state.user.token);
        // eslint-disable-next-line
        const router = useRouter();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const user = useGetStore(selectUser);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!localStorage.getItem("token")) {
                if (router.route.includes("admin")) {
                    router.push("/admin/login");
                }
            } else {
                if (!token && !isWait) {
                    store.dispatch(userApi.endpoints.getDetail.initiate(""));
                    setIsWait(true);
                }
                ;
                setIsAdmin(user?.role_name === 'admin');
            }
        }, [user, token]);
        return (
            <WrappedComponent {...props} isAdmin={isAdmin}/>
        );
    };

    wrapper.getLayout = WrappedComponent.getLayout ?? WrappedComponent.getLayout;
    return wrapper;
};

export default withAuthSync;
