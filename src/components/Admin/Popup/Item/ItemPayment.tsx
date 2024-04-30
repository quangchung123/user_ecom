import MyPopup from "@/components/Admin/Popup/MyPopup";
import {useAppSelector} from "@/store";
import {EStatusPayment} from "@/types/enum";
import {useGetInfoPaymentByIdQuery, useGetInfoPaymentQuery} from "@/services/api/adminApi";
import React, {useMemo} from "react";
import get from "lodash.get";
import {convertToVietnameseDong} from "@/utils/help";
import styles from "@/components/Admin/Popup/styles/order.module.scss";

const ItemPayment = () => {
    const dataPayload = useAppSelector((state) => state.popup.data);
    const {data, isSuccess} = useGetInfoPaymentByIdQuery({merge: dataPayload});
    const dataItem = useMemo(() => get(data, 'data' )|| [], [data, isSuccess]);
    const price  = useMemo(()=>convertToVietnameseDong(dataItem.amount),[dataItem.amount])
    return(
        <React.Fragment>
            {
                isSuccess &&
                <div className={styles['container-user']}>
                    <div>
                        <label>Chủ tài khoản: </label>
                        <span>{dataItem.user?.name}</span>
                    </div>
                    <div>
                        <label>Số điện thoại: </label>
                        <span>{dataItem.user?.phone_number}</span>
                    </div>
                    <div>
                        <label>Thông tin ngân hàng: </label>
                        <span>{`${dataItem.user?.bank.bank_name} ${dataItem.user?.bank.
                            bank_account}`}</span>
                    </div>
                    <div>
                        <label>Số dư: </label>
                        <span>{price}</span>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
export default ItemPayment;