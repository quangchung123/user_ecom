import '@/styles/globals.scss';
import '@/styles/nprogress.css';
import '@/styles/loading.css';
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import 'react-responsive-pagination/themes/minimal.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'reactjs-popup/dist/index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store} from "@/store/makeStore";
import NProgress from 'nprogress';
import {Router} from "next/router";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import 'sweetalert2/src/sweetalert2.scss';

export type INextPageWithLayout = {
    Component: {
        getLayout?: (page: ReactElement) => ReactNode,
    },
    getLayout?: (page: ReactElement) => ReactNode,
} & AppProps & any;

export default function App({Component, pageProps}: INextPageWithLayout) {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
    const getLayout = (Component.getLayout ?? ((page: NextPage) => page));
    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    )
}
