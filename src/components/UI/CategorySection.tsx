import React from 'react';
import {IPropsCategory, IReactWithChildren} from "@/types";
import {useRouter} from "next/router";

const CategorySection:IReactWithChildren<{item:IPropsCategory}> = ({item}) => {
    const {image,title,subContent,alt_image,id} = item;
    const router = useRouter();
    const handleNextPage = ()=>{
        router.push(`/${id}`);
    }
    return (
        <li className={"category-item"} onClick={handleNextPage}>
            <img src={image} alt={alt_image || title}
                 className="category-item__img--zoom"/>
            <div className={"category-item__content"}>
                <article className={"category-item__content--title"}>{title}</article>
                <p className={"category-item__content--description"}>{subContent}</p>
                <p >⭐⭐⭐⭐⭐</p>
            </div>
        </li>
    );
};

export default CategorySection;
