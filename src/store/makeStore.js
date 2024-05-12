import {combineReducers, configureStore} from "@reduxjs/toolkit";
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
import {cartApi} from "../services/cart";
import cartSlice from "./action/cartSlice";
import dataCitySelectedSlice from "./action/dataCitySelectedSlice";
import orderApi from "../services/order";
import productSelectedApi from "../services/productSelected";
import productSelectedSlice from "./action/productSelectedSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userAccount', 'cart', 'citySelected'],
};
const rootReducer = combineReducers({
    userAccount: userAccountSlice.reducer,
    themeMode: changeThemeSlice.reducer,
    resetState: resetStateSlice.reducer,
    filterRating: filterRatingSlice.reducer,
    cart: cartSlice.reducer,
    productSelected: productSelectedSlice.reducer,
    citySelected: dataCitySelectedSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productSelectedApi.reducerPath]: productSelectedApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userApi.middleware,
          productApi.middleware,
          categoriesApi.middleware,
          commentApi.middleware,
          cartApi.middleware,
          productSelectedApi.middleware
        )
});

export const persistor  = persistStore(store)
