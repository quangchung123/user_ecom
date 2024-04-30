import React from 'react';
import Link from "@/components/UI/Link";
import {IPropsCategory, IReactWithChildren} from "@/types";

const Footer: IReactWithChildren<{ categories: Array<any>, contacts: any }> = ({categories, contacts}) => {

    return (
        <footer className="footer">
            <div className="flex flex-wrap text-left lg:text-left">
                <div className="w-full lg:w-6/12">
                    <h4 className="text-3xl fonat-semibold">Thông tin liên hệ</h4>
                    <ul className="mt-6 lg:mb-0 mb-6 space-y-2">
                        {contacts.detail.map((item: any, index: number) => {
                            return (
                                <li key={index} className={"cursor-pointer space-x-2 flex items-start "}>
                                    <div className={"!text-primary border px-1 rounded-sm"}
                                         dangerouslySetInnerHTML={{__html: item.icon}}>
                                    </div>
                                    <a className={"text-black no-underline hover:text-accent text-base"}
                                       target={"_blank"} {...(item?.router ? {href: item.router} : {})} >
                                        {item.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="w-full lg:w-6/12">
                    <div className="flex flex-wrap items-top mb-6">
                        <div className="w-full lg:w-4/12 ml-auto">
                            <span className="text-3xl fonat-semibold">Chính sách</span>
                            <ul className="list-unstyled">
                                {/*{categories.map((item: IPropsCategory, index: number) => {*/}
                                {/*    return (*/}
                                {/*        <Link url={`/${item.id}/list`} key={index}>*/}
                                {/*            <a className="no-underline font-semibold pb-2 text-base hover:text-primary"*/}
                                {/*               href="https://www.creative-tim.com/presentation?ref=njs-profile">{item.title}</a>*/}
                                {/*        </Link>*/}
                                {/*    )*/}
                                {/*})}*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-blueGray-300"/>
            <div className="flex flex-wrap items-center md:justify-between justify-center mb-1">
                <div className="w-full md:w-4/12">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Copyright © <span id="get-current-year">2024</span><a
                        href="https://www.creative-tim.com/product/notus-js"
                        className="text-blueGray-500 hover:text-gray-800" target="_blank"/>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
