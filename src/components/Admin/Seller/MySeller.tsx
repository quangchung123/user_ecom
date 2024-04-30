import React from 'react';
import LayoutAdmin from "@/container/admin/LayoutAdmin";
import MyTableSeller from "@/components/Admin/Table/MyTableSeller";
import MyTab from "@/components/Admin/Tab/MyTab";
import {tabsSeller} from "@/config/constant";

const MySeller = () => {
    const tabName = tabsSeller;
    return (
        <LayoutAdmin>
            <MyTab tabs={tabName}/>
            <MyTableSeller />
        </LayoutAdmin>
    );
};

export default MySeller;