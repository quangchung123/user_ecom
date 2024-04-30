import React, {ButtonHTMLAttributes, HTMLAttributes, ReactElement} from "react";
import {InputFieldProps} from "@/components/Core/Field/InputField";

export type IReactWithChildren<T> =  React.FC<React.PropsWithChildren<T>>
export type IDivProps = HTMLAttributes<HTMLDivElement>;
export type ILiProps = HTMLAttributes<HTMLLIElement>;
export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ICurrentPopupProps = { openModal?: any, closeModal?: any,data?: any};
export type IDataAction = Array<{ key:string | number,title:string,value:any }>
export type IRemoveRowTableProps =(current:ICurrentPopupProps)=>void;

export type IBodyResponse = {
    error:boolean,
    data:any,
    message:string,
    validation:any,
    "code": number,
}

export type IBodyResponseMutation = {data:IBodyResponse,error?:Error}

export type Column ={
    name:string,
    title:string,
    input?:Partial<InputFieldProps>,
    renderCell?:(row:any)=>ReactElement,
    ignore?:boolean,
    actions?:(row:any)=>ReactElement,
}
export type Columns = Array<Column>

export type IPropsCategory = {
    image:string;
    title:string;
    content:string;
    subContent:string;
    alt_image:string;
    id:string;
}

export type IPayloadPost = {
    content:string,
    subContent:string,
    title:string,
    alt_image:string,
    image:string,
    id?:string,
}
