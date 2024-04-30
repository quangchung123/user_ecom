import React from 'react';
import styles from '@/components/Form/Form.module.scss';
import {IReactWithChildren} from "@/types";

const PopupForm: IReactWithChildren<any> = ({children}) => {
    return (
        <div className={styles["form"]}>
            {children}
        </div>
    );
};

export default PopupForm;
