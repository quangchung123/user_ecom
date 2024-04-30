import React from 'react';
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import {log} from "util";
import {convertToVietnameseDong} from "@/utils/help";
import styles from "@/components/Admin/Order/info.module.scss";

const InfoProduct = ({value, id, amount} : any) => {
    return (
        <div className={'flex flex-col'}>
            <div>
                 <ImagePlacerHolder value={value.image} className={"image-table"}/>
            </div>
            <div className={`${styles['container-info']} flex flex-col mt-0.5`}>
                <div>
                    <label>Tên: </label>
                    <span>{value.name}</span>
                </div>
                <div>
                    <label>Giá: </label>
                    <span>{convertToVietnameseDong(value.price)}</span>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default InfoProduct;