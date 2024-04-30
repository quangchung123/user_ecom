import React from 'react';
import {IReactWithChildren} from "@/types";
import db from "@/services/firebase/db";
import {useRouter} from "next/router";
import {ulrAdmin} from "@/config/constant";
import {notifyConfirm} from "@/utils/help";

const RowAction:IReactWithChildren<{row:any,url:string}> = ({row,url}) => {
    const router = useRouter();
    const edit = ()=>{
      router.push(`${ulrAdmin}/${url}/${row?.id}`);
    }
    const remove =async ()=>{
        await notifyConfirm("Bạn có muốn xóa không?",async ()=>{
            await db.remove(`${url}/${row?.id}`)
        })
    }
    return (
        <>
            <button onClick={edit} className={`focus:outline-none`}>
                <i className="bi bi-pencil-square"></i>
            </button>
            <button onClick={remove} className={`focus:outline-none`}>
                <i className="bi bi-x-circle"></i>
            </button>
        </>
    );
};

export default RowAction;
