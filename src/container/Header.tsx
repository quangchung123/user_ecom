import React from 'react';
import Logo from "@/components/UI/Logo";
import Link from "@/components/UI/Link";
import {IPropsCategory, IReactWithChildren} from "@/types";
import {useRouter} from "next/router";

const Header: IReactWithChildren<{ categories: Array<any>,contacts: any }> = ({categories,contacts}) => {
    const router = useRouter();
    return (
        <nav
            className="header">
            <div className={"header-container"}>
                <div className={"header__layout--top"}>
                    <Logo src={contacts?.logo}/>
                    <div className={"header__layout--top-contact"}>
                        <div className={"header__layout--top-contact-phone"}>
                            <i className="bi bi-telephone"></i>
                            <p className={"title-header mb-0"}>{contacts.phone}</p>
                        </div>
                        <ul className={"header__layout--top-contact-pages mb-0"}>
                            {contacts.pages.map((item: any, index: number) => {
                                return (
                                    <li key={index} className={`header__layout--top-contact-item`}>
                                        <a target={"_blank"} href={item.router}>
                                            <div dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <ul className="header__layout--left">
                    {categories.map((item: IPropsCategory, index: number) => {
                        return (
                            <Link url={`/${item.id}/list`} key={index} className={`header__layout--item  ${router.asPath.includes(item.id) ?"text-primary":""}`}>
                                <a className={"header__layout--item-title"}>
                                    {item.title}
                                </a>
                                {index < categories.length - 1 && (<span>/</span>)}
                            </Link>
                        )
                    })}
                </ul>
                <div className={"header__layout--mobile"}>
                    <div className={"header__layout--mobile-icon"}>
                        <i className="bi bi-list"></i>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
