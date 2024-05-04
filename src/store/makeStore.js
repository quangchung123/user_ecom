import { configureStore } from "@reduxjs/toolkit";
import {userApi} from "../services/user";
import userAccountSlice from "./action/userAccountSlice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {productApi} from "../services/product";
import {categoriesApi} from "../services/categories";
import changeThemeSlice from "./action/changeThemeSlice"
import resetStateSlice from "./action/resetStateSlice";
import {commentApi} from "../services/comment";
import filterRatingSlice from "./action/filterRatingSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};
const persistedUserAccountReducer = persistReducer(persistConfig, userAccountSlice.reducer);

export const store = configureStore({
    reducer: {
        userAccount: persistedUserAccountReducer,
        themeMode: changeThemeSlice.reducer,
        resetState: resetStateSlice.reducer,
        filterRating: filterRatingSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, productApi.middleware, categoriesApi.middleware, commentApi.middleware)
});

export const persistor  = persistStore(store)
