import {configureStore} from "@reduxjs/toolkit";
import userApi from "@/services/api/userApi";
import userSlice from "@/services/storage/userSlice";
import popupSlice from "@/services/storage/popupSlice";
import {adminApi} from "@/services/api/adminApi";
import modalSlice from "@/services/storage/modalSlice";
import tabSlice from "@/services/storage/tabSlice";

export const makeStore = () => configureStore({
    reducer: {
        [userApi.reducerPath]:userApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [userSlice.name]:userSlice.reducer,
        [popupSlice.name]:popupSlice.reducer,
        [modalSlice.name]: modalSlice.reducer,
        [tabSlice.name]: tabSlice.reducer
    },
    devTools: true,
    // @ts-ignore
    middleware: (gDM) => gDM({
        serializableCheck: false
    }).concat(
        [
            userApi.middleware,
            adminApi.middleware
        ]
    ),
});
export const store = makeStore();
