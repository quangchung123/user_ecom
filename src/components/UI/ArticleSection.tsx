import React from 'react';
import {IPropsCategory, IReactWithChildren} from "@/types";
import {useRouter} from "next/router";

const CategorySection:IReactWithChildren<{item:IPropsCategory}> = ({item}) => {
    const {image,title,subContent,alt_image,id} = item;
    const router = useRouter();
    const handleNextPage = ()=>{
        router.push(`/detail/${id}`);
    };

    return (
        <li className={"article-item"} onClick={handleNextPage}>
            <img src={image} alt={title}
                 className="article-item__img--zoom"/>
            <div className={"article-item__content"}>
                <article className={"article-item__content--title"}>{title}</article>
                <p className={"article-item__content--description"}>{subContent}</p>
            </div>
        </li>
    );
};

export default CategorySection;
