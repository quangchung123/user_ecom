import React from 'react';
import LayoutAdmin from "@/container/admin/LayoutAdmin";
import MyTableOrder from "@/components/Admin/Table/MyTableOrder";
import MyTab from "@/components/Admin/Tab/MyTab";
import {tabs} from "@/config/constant";

export const MyOrder = () => {
    return (
        <LayoutAdmin>
            <MyTab tabs={tabs}/>
            <MyTableOrder />
        </LayoutAdmin>
    );
};