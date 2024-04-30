import React, {useMemo} from 'react';
import {useAppSelector} from "@/store";
import {useGetInfoOrderQuery} from "@/services/api/adminApi";
import get from "lodash.get";
import {Element} from "@/components/Admin/Popup/Item/ItemShop";
import ElementAccordion from "@/components/Admin/Popup/ElementAccordion";
import {detailPopupOrder} from "@/config/constant";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import {convertToVietnameseDong} from "@/utils/help";
import styles from "@/components/Admin/Popup/styles/order.module.scss";


const ItemOrder = () => {
    const idShop = useAppSelector((state) => state.popup.data);
    const {data, isSuccess} = useGetInfoOrderQuery({merge : idShop});
    let dataDetailOrder= useMemo(() => get(data,'data') || [],[data,isSuccess]);
    dataDetailOrder = {
        ...dataDetailOrder,
        commission: dataDetailOrder.current_product?.commission * dataDetailOrder.current_product?.price * dataDetailOrder.current_commission_seller?.percent
    }
    return (
        <div className={"space-y-2 pb-28"}>
            <ElementAccordion item={detailPopupOrder[0]}>
                <div className={styles['container-user']}>
                    <div>
                        <label>Tên người mua: </label>
                        <span>{dataDetailOrder.user?.name}</span>
                    </div>
                    <div>
                        <label>Số điện thoại: </label>
                        <span>{dataDetailOrder.user?.phone_number}</span>
                    </div>
                    <div>
                        <label>Chú ý: </label>
                        <span>{dataDetailOrder.note}</span>
                    </div>
                    {/*<div>*/}
                    {/*    <label className={"font-bold text-base pr-1"}>Ngân hàng: </label>*/}
                    {/*    <span className={"italic"}>{`${dataDetailOrder.user?.bank.bank_account} ${dataDetailOrder.user?.bank.bank_name}`}</span>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label className={"font-bold text-base pr-1"}>Địa chỉ: </label>*/}
                    {/*    <span className={"italic"}>{`${dataDetailOrder.user?.location.street} */}
                    {/*                        ${dataDetailOrder.user?.location.commune} */}
                    {/*                        ${dataDetailOrder.user?.location.district} */}
                    {/*                        ${dataDetailOrder.user?.location.city}`}</span>*/}
                    {/*</div>*/}
                </div>
            </ElementAccordion>
            <ElementAccordion item={detailPopupOrder[1]}>
                <div className={styles['container-user']}>
                    <div>
                        <label>Tên shop: </label>
                        <span>{dataDetailOrder.shop?.name}</span>
                    </div>
                    <div>
                        <label>Số điện thoại: </label>
                        <span>{dataDetailOrder.shop?.phone_number}</span>
                    </div>
                    <div>
                        <label>Nghành nghề: </label>
                        <span>{dataDetailOrder.shop?.business}</span>
                    </div>
                    <div>
                        <label >Mô tả: </label>
                        <span >{dataDetailOrder.shop?.description}</span>
                    </div>
                    {/*<div>*/}
                    {/*    <label className={"font-bold text-base pr-1"}>Ngân hàng: </label>*/}
                    {/*    <span className={"italic"}>{`${dataDetailOrder.user?.bank.bank_account} ${dataDetailOrder.user?.bank.bank_name}`}</span>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label className={"font-bold text-base pr-1"}>Địa chỉ: </label>*/}
                    {/*    <span className={"italic"}>{`${dataDetailOrder.user?.location.street} */}
                    {/*                        ${dataDetailOrder.user?.location.commune} */}
                    {/*                        ${dataDetailOrder.user?.location.district} */}
                    {/*                        ${dataDetailOrder.user?.location.city}`}</span>*/}
                    {/*</div>*/}
                </div>
            </ElementAccordion>
            <ElementAccordion item={detailPopupOrder[2]}>
                <div className={'mt-2'}>
                    <div className={''}>
                        <ImagePlacerHolder value={dataDetailOrder.current_product?.image} className={"image-table w-36 h-40 rounded-sm"}/>
                    </div>
                    <div className={styles['container-user']}>
                        <div>
                            <label>Tên: </label>
                            <span>{dataDetailOrder.current_product?.name}</span>
                        </div>
                        <div>
                            <label>Giá: </label>
                            <span>{convertToVietnameseDong(dataDetailOrder.current_product?.price)}</span>
                        </div>
                        <div>
                            <label>Hoa hồng: </label>
                            <span >{`${(convertToVietnameseDong(dataDetailOrder.current_product?.commission * dataDetailOrder.current_product?.price))}`}</span>
                        </div>
                        <div>
                            <label>Số lượng: </label>
                            <span>{dataDetailOrder.amount} </span>
                                <div>
                                    <label>Mô tả: </label>
                                    <span>{dataDetailOrder.current_product?.detail}</span>
                                </div>
                            <div>
                                <label>Hoa hồng: </label>
                                <span>{convertToVietnameseDong(dataDetailOrder.commission)}</span>
                            </div>
                         </div>
                    </div>
                    <div>
                    </div>
                </div>
            </ElementAccordion>
        </div>
    );
};

export default ItemOrder;