import React from 'react';
import LayoutAdmin from "@/container/admin/LayoutAdmin";
import MyTableBanner from "@/components/Admin/Table/MyTableBanner";

const MyBanner = () => {
    return (
        <LayoutAdmin>
            <MyTableBanner />
        </LayoutAdmin>
    );
};

export default MyBanner;