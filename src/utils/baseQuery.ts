import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {baseUrlApi} from "@/config/app";
import {omit} from "next/dist/shared/lib/router/utils/omit";

export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api) => {
    // @ts-ignore
    const {method, url, body:x} = args;
    const merge=x?.merge ||"";
    var body = omit(x,['merge']);
    // @ts-ignore
    const token = api.getState().user?.token || localStorage.getItem("token");
    var myHeaders = new Headers();
    if (token !== null) {
        myHeaders.append('Authorization', `Bearer ${token}`);
    }
    var myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "69420");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", `application/json`);
    var requestOptions = {
        method,
        headers: myHeaders,
        ...(method ==='GET'?{}:{ body:JSON.stringify(body)}),
        redirect: 'follow',
    };
    // @ts-ignore
    const paramsQuery =(method ==='GET' && body)? Object.entries(body).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`).join('&'):"";

    //@ts-ignore
    const result = await fetch(`${baseUrlApi}/${url}/${merge}?${paramsQuery}`, {...requestOptions});
    let data = await result.json();
    return {data,meta:data,}
}
