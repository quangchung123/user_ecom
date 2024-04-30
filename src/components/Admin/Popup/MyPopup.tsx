import React, {memo, useMemo} from 'react';
import styles from "@/components/Admin/Popup/popup.module.css";
import popupSlice from "@/services/storage/popupSlice";
import {useDispatch} from 'react-redux';
import {useAppSelector} from "@/store";
import {convertToVietnameseDong} from "@/utils/help";
import {IReactWithChildren} from "@/types";

const Element:IReactWithChildren<{product:any}> = ({product})=>{
    const price  = useMemo(()=>convertToVietnameseDong(product.price),[product.price])
    return (
        <div key={product.id} className="relative border shadow-sm rounded-xl overflow-hidden">
            <div>
                <img src={product.image}/>
            </div>
            <div className="flex flex-col pl-2 py-3">
                <div className={"text-left"}>
                    <span className="font-semibold">{product.name}</span>
                </div>
                <div>
                    <span>{price}</span>
                </div>
                <div className={"absolute top-0 right-0 w-10 flex justify-center items-center text-sm h-6 rounded-tr-xl bg-primary rounded-bl-xl text-white"}>
                    <span>{product.commission}</span>
                </div>
            </div>
        </div>
    )
}
const MyPopup: IReactWithChildren<{ popupId: number | string }> = ({children, popupId}: any) => {
    const dispatch = useDispatch();

    const handleClosePopup = () => {
        dispatch(popupSlice.actions.popup([]))
    }
    //select popup open
    const selectIdPopup = useAppSelector((state) => state.popup.popupId);
    return (
        <>
            {selectIdPopup.includes(popupId) && (
                <div className={`${styles.popup} overflow-auto less_sm:w-full px-3 `}>
                    <div className={"flex justify-end mt-2 pr-2 "}>
                        <button onClick={handleClosePopup}>
                            <i className="bi bi-x-circle-fill  text-[20px]"></i>
                        </button>
                    </div>
                    <hr className={"my-3"}/>
                    <div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(MyPopup);
