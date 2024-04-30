import {createApi} from "@reduxjs/toolkit/query";
import {baseQuery} from "@/utils/baseQuery";
import {IBodyResponse} from "@/types";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    tagTypes: ['LOGIN'],
    endpoints: (builder) => ({
        login: builder.mutation<IBodyResponse,{phone_number:string,password:string}>({
            query(body) {
                return {
                    url: 'login',
                    method: 'POST',
                    body
                };
            },
        }),
    }),
});

export default userApi


