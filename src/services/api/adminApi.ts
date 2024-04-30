import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "@/utils/baseQuery";
import {IBodyResponse} from "@/types";
import {EStatusPayment, EStatusShop} from "@/types/enum";

export const tagTypes = ['Payment'] as const;
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: baseQuery,
    tagTypes: ["Payment","Commission", "Shop"],
    refetchOnFocus: true,
    endpoints: (builder) => ({
        getInfoShop: builder.query<IBodyResponse,{level:number,page?:number,size?:number, status:EStatusShop}>({
            query(body) {
                return {
                    url: 'user/show',
                    method: 'GET',
                    body
                }
            },
            providesTags: ['Shop']
        }),
        getInfoShopById: builder.query<IBodyResponse,{merge:string|number}>({
            query(body) {
                return {
                    url: 'user',
                    method: 'GET',
                    body
                }
            }
        }),
        updateStatusShop: builder.mutation<IBodyResponse, {id: number, status: EStatusShop}>({
            query(body ) {
                return {
                    url: 'user/confirm',
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Shop']
        }),
        getInfoPayment: builder.query<IBodyResponse, {status: string, merge?:string|number}>({
            query(body: any) {
                return {
                    url: 'finance/show',
                    method: 'GET',
                    body
                }
            },
            providesTags:['Payment']
        }),
        getInfoPaymentById: builder.query<IBodyResponse, {merge: number}>({
            query(body) {
                return {
                    url: 'finance/show',
                    method: 'GET',
                    body
                }
            }
        }),
        updateInfoPayment: builder.mutation<IBodyResponse,{id:number,status:EStatusPayment}>({
            query(body: any) {
                return {
                    url: 'finance/update',
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags:['Payment']
        }),
        updateInfoCommission: builder.mutation<IBodyResponse, {id: number, name: string, percent: number}>({
           query(body) {
               return {
                   url: 'commission/update',
                   method: 'PUT',
                   body
               }
           },
            invalidatesTags:['Commission']
        }),
        getInfoCommission: builder.query<IBodyResponse, {name?: string, percent?: number}>({
            query(body) {
                return {
                    url: 'commission/show',
                    method: 'GET',
                    body
                }
            },
            providesTags: ['Commission']
        }),
        getInfoOrder: builder.query<IBodyResponse,{status: string}>({
            query(body) {
                return {
                    url: 'order/show',
                    method: 'GET',
                    body
                }
            }
        }),
        getInfoOrderById: builder.query<IBodyResponse,{merge:string|number}>({
            query(body) {
                return {
                    url: 'order/show',
                    method: 'GET',
                    body
                }
            }
        }),
        getInfoBanner: builder.query({
            query(body){
                return {
                    url: 'banner/show',
                    method: 'GET',
                    body
                }
            }
        }),
        getInfoBannerById: builder.query<IBodyResponse, {merge : number}>({
            query(body){
                return {
                    url: 'banner/show',
                    method: 'GET',
                    body
                }
            }
        }),
    }),
});

export const {
    useGetInfoShopQuery,
    useGetInfoShopByIdQuery,
    useGetInfoPaymentQuery,
    useUpdateInfoPaymentMutation,
    useGetInfoCommissionQuery,
    useUpdateStatusShopMutation,
    useGetInfoOrderQuery,
    useGetInfoBannerQuery,
    useGetInfoPaymentByIdQuery,
    useGetInfoBannerByIdQuery
} = adminApi

