import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {ColumnDef} from '@tanstack/react-table';
import TableResponse from '@/components/Core/Table/TableResponse';
import useApiTable from '@/hooks/useApiTable';
import {useDispatch} from 'react-redux';
// @ts-ignore
import ResponsivePagination from 'react-responsive-pagination';
import get from "lodash.get";
import {
    useGetInfoBannerQuery, useGetInfoCommissionQuery,
} from "@/services/api/adminApi";
import ItemPayment from "@/components/Admin/Popup/Item/ItemPayment";
import MyPopup from "@/components/Admin/Popup/MyPopup";
import popupSlice from "@/services/storage/popupSlice";
import {EActionBanner, EActions, EPopup} from "@/types/enum";
import ItemCommission from "@/components/Admin/Popup/Item/ItemCommission";
import {schemaLogin} from "@/config/validate";
import BoxForm from "@/components/Core/BoxForm";
import ImagePlacerHolder from "@/components/UI/ImagePlacerHolder";
import MenuAction from "@/components/Core/Table/MenuAction";
import ItemBanner from "@/components/Admin/Popup/Item/ItemBanner";

type IBanner = {
    image: string;
    type: string;
};

function App() {
    const {data} = useGetInfoBannerQuery({});
    const dispatch = useDispatch();
    const dataPayment = useMemo(() => get(data, 'data.data') || [], [data]);

    const ref = useApiTable<IBanner>({
        image: 'xs',
        type: 'xs'
    });


    const defaultColumns: ColumnDef<IBanner>[] = [
        {
            accessorKey: 'image',
            header: () => <span>Ảnh sản phẩm</span>,
            cell: (info) => <ImagePlacerHolder value={info.getValue()} className={'image-table-banner'}/>,
        },
        {
            accessorKey: 'type',
            header: () => <span>Vị trí</span>,
            cell: (info) => info.getValue(),
            size: 100
        },
        {
            accessorKey: 'id',
            header: '',
            size: 50,
            cell: (info) => {
                const handleGetItem = ((e: any) => {
                        dispatch(popupSlice.actions.popup({
                            popupId: [EPopup.Banner],
                            data: info.getValue(),
                        }))
                });
                return (
                    <button onClick={handleGetItem}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                );
            }
        }
    ]
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (page: any) => {
        setCurrentPage(page);
        if (ref.current) {
            ref.current.table.setPageIndex(page - 1);
        }
    };

    return (
        <div className="p-2">
            <MyPopup popupId={"Banner"}>
                <BoxForm>
                    <ItemBanner />
                </BoxForm>
            </MyPopup>
            <TableResponse<IBanner> reference={ref} columns={defaultColumns} data={dataPayment}>
                <ResponsivePagination
                    className={'pagination justify-content-end my-5 space-x-1.5'}
                    total={100}
                    current={currentPage}
                    onPageChange={handleChangePage}
                    maxWidth={320}
                />
            </TableResponse>
        </div>
    );
}

export default function MyTableBanner() {
    return <App/>;
}
