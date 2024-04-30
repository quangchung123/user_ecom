import {useAppSelector} from "@/store";
import {useGetInfoPaymentQuery, useGetInfoShopByIdQuery} from "@/services/api/adminApi";
import React, {useMemo} from "react";
import get from "lodash.get";
import ElementAccordion from "@/components/Admin/Popup/ElementAccordion";
import {detailPopups} from "@/config/constant";
import {IReactWithChildren} from "@/types";
import {convertToVietnameseDong} from "@/utils/help";
import MyPopup from "@/components/Admin/Popup/MyPopup";

export const Element:IReactWithChildren<{product:any}> = ({product})=>{
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
const ItemShop = () => {
    const idShop = useAppSelector((state) => state.popup.data);
    const {data, isSuccess} = useGetInfoShopByIdQuery({merge: idShop});
    const dataDetailShop = useMemo(() => get(data,'data') || [],[data,isSuccess]);

    return (
        <div className={"space-y-2 pb-28"}>
            <ElementAccordion item={detailPopups[0]}>
                <div className={""}>
                    <div>
                        <label className={"font-bold text-base pr-1 "}>Tên shop: </label>
                        <span className={"italic"}>{dataDetailShop.name}</span>
                    </div>
                    <div>
                        <label className={"font-bold text-base pr-1 "}>Số điện thoại: </label>
                        <span className={"italic"}>{dataDetailShop.phone_number}</span>
                    </div>
                    <div>
                        <label className={"font-bold text-base pr-1"}>Mô tả: </label>
                        <span className={"italic"}>{dataDetailShop.description}</span>
                    </div>
                </div>
            </ElementAccordion>
            <ElementAccordion item={detailPopups[1]}>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto expedita illum laboriosam, magnam optio rerum! Adipisci amet earum iste laborum magnam molestias nam nihil odio omnis, quas recusandae ut veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur eaque ex laboriosam velit? Ad adipisci aspernatur at cupiditate, earum exercitationem illum, labore odit sapiente temporibus unde vel voluptates voluptatum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem, deserunt dolorum ea explicabo hic inventore, itaque laudantium libero magni natus odio perspiciatis recusandae sed tempora, totam unde ut voluptatibus.</div>
            </ElementAccordion>
            <ElementAccordion item={detailPopups[2]}>
                <div className={"grid grid-cols-2 gap-3 my-2"}>
                    {dataDetailShop.products?.map((product: any) => (
                        <Element product={product} />
                    ))}
                </div>
            </ElementAccordion>
        </div>

    )
}
export default ItemShop;