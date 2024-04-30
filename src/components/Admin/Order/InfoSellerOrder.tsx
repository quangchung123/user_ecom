import React from 'react';
import styles from "@/components/Admin/Order/info.module.scss";

export const InfoSellerOrder = ({value} : any) => {
    return (
        <div className={styles['container-info']}>
            <div>
                <label>Tên: </label>
                <span>{value.name}</span>
            </div>
            <div>
                <label>Số điện thoại: </label>
                <span>{value.phone_number}</span>
            </div>
        </div>
    );
};

