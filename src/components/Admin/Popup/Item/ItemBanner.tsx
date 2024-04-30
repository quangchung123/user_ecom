import React, {useMemo} from 'react';
import {useAppSelector} from "@/store";
import {useGetInfoBannerByIdQuery} from "@/services/api/adminApi";
import get from "lodash.get";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";

const ItemBanner = () => {
    const idBanner = useAppSelector((state) => state.popup.data);
    return (
        <div>
            1
            {/*<div className={''}>*/}
            {/*    <ImagePlacerHolder value={dataBanner?.image} className={"image-table w-36 h-40 rounded-sm"}/>*/}
            {/*</div>*/}
            {/*    <div>*/}
            {/*        <label className={"font-bold text-base pr-1 "}>Vị trí: </label>*/}
            {/*        <span className={"italic"}>{dataBanner?.type}</span>*/}
            {/*    </div>*/}
        </div>
    );
};

export default ItemBanner;