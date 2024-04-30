import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BASE_URL

export const customBaseQuery = fetchBaseQuery({
    baseUrl: baseUrl
})