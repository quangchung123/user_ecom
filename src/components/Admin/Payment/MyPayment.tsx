import MyTablePayment from "@/components/Admin/Table/MyTablePayment";
import React from "react";
import MyTab from "@/components/Admin/Tab/MyTab";
import LayoutAdmin from "@/container/admin/LayoutAdmin";
import {tabs} from "@/config/constant";

export const MyPayment = () => {
    const tabName = tabs;
    return (
            <LayoutAdmin>
                <MyTab tabs={tabName}/>
                <MyTablePayment />
            </LayoutAdmin>
    )
}
